import * as React from 'react';
import {Card, Modal, Typography, Box, IconButton, Tabs, Tab, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import useTranslate from "../hook/useTranslate.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenEsp32CodeModal } from "../redux/feature/actions/actionSlice.js";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {useEffect, useState} from "react";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function ModalCodeEsp32Component() {
    const open = useSelector((state) => state.action.isOpenEsp32CodeModal);
    const roomData = useSelector((state) => state.room.roomDataForEsp32Code);
    const esp32RoomId = useSelector((state) => state.room.esp32RoomId);
    const isTemperature = useSelector((state) => state.room.esp32IsTemp);
    const isHumidity = useSelector((state) => state.room.esp32IsHumidity);
    const isPM2_5 = useSelector((state) => state.room.esp32IsPm2_5);
    const isPower = useSelector((state) => state.room.esp32IsPower);
    const isSwitch = useSelector((state) => state.room.esp32IsSwitch);
    const tempId = useSelector((state) => state.room.esp32TempId);
    const humId = useSelector((state) => state.room.esp32HumidityId);
    const pm2_5Id = useSelector((state) => state.room.esp32Pm2_5Id);
    const powerId = useSelector((state) => state.room.esp32PowerId);
    const switchId = useSelector((state) => state.room.esp32SwitchId);
    console.log(isSwitch)
    console.log(switchId)
    const dispatch = useDispatch();
    const { t } = useTranslate();
// Generate dynamic relay configurations for ESP32 WiFi code
    const generateRelayConfigForWifi = () => {
        if (!isSwitch || !switchId || switchId.length === 0) return '';

        let definitions = '';
        let configArray = '';
        const numRelays = switchId.length;

        switchId.forEach((id, index) => {
            // Define a unique pin for each relay, assuming user will replace YOUR_RELAY_PIN_X
            definitions += `#define RELAY_${id}_PIN YOUR_RELAY_PIN\n`;
            definitions += `#define RELAY_ID_${id} ${id}\n`;
            configArray += `  { RELAY_ID_${id}, RELAY_${id}_PIN }`;
            if (index < switchId.length - 1) {
                configArray += ',\n';
            }
        });

        return `
// =============================================
// Relay
${definitions}
struct RelayConfig {
  const int id;
  int pin;
};
RelayConfig relayConfigs[] = {
${configArray}
};
const int numRelays = sizeof(relayConfigs) / sizeof(relayConfigs[0]);
Adafruit_MCP23X17 mcp;`;
    };
    const esp32EthernetCode = `#include <SPI.h>
#include <Ethernet_Generic.h>
#include <PubSubClient.h>${isTemperature || isHumidity ? `\n#include "DHT.h"` : ``}${isPM2_5 ? `\n#include <PMS.h>` : ``}
#include <ArduinoJson.h>${isSwitch ? `\n#include <Wire.h>
#include <Adafruit_MCP23X17.h>` : ``}${isPower ? `\n#include <PZEM004Tv30.h>`:``}
#include <Preferences.h>

// Ethernet
//==============================================
#define W5500_CS 5
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// Static network configuration
IPAddress ip(172, 16, 178, 59);
IPAddress gateway(172, 16, 0, 1);
IPAddress subnet(255, 255, 0, 0);
IPAddress dnsServer(8, 8, 8, 8); 
EthernetClient espClient;
// LocalStorage
// =============================================
Preferences prefs;${isTemperature || isHumidity ?
        `
//==============================================
// DHT SENSOR
#define DHTPIN YOUR_DHT_PIN
#define DHTTYPE DHT21 ${isTemperature ? `\n#define DHT_ID ${tempId}` : ''} ${isHumidity ? `\n#define HUMIDITY_ID ${humId}` : ''}
DHT dht(DHTPIN, DHTTYPE);`:``
    }${isPM2_5 ? `
//==============================================
// PM2.5 SENSOR
#define RX1_PIN YOUR_RX1_PIN
#define TX1_PIN YOUR_TX1_PIN
#define PM2_5_ID ${pm2_5Id}
HardwareSerial pmsSerial(2);
PMS pms(pmsSerial);
PMS::DATA data;`:``}${isSwitch ? generateRelayConfigForWifi() : ''}${isPower ? `
//==============================================
// Power Sensor
#define RX2_PIN YOUR_RX2_PIN
#define TX2_PIN YOUR_TX2_PIN
#define POWER_ID ${powerId}
HardwareSerial mySerial1(1);
PZEM004Tv30 pzem(mySerial1, RX2_PIN, TX2_PIN);
`:``}
// =============================================
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "149.130.222.18";
const int mqtt_port = 1883;
const char* mqtt_user = "eichanudom";
const char* mqtt_password = "Domkh@#12";

// Unique room ID
const char* roomId = "${esp32RoomId}";

// Topics (dynamically built from roomId)
String statusTopic = String("/room/") + roomId + "/status";
String dataTopic = String("/room/") + roomId + "/data";
String controlTopic = String("/room/") + roomId + "/control";

PubSubClient client(espClient);

unsigned long lastMsgTime = 0;
const long interval = 2000;${isSwitch ? `\n
void saveRelayState(int deviceId, int value) {
  prefs.begin("relay_state", false);
  prefs.putInt(String(deviceId).c_str(), value);
  prefs.end();
}

void clearRelayStates() {
  prefs.begin("relay_state", false);
  prefs.clear();
  prefs.end();
}

void restoreRelayStates() {
  prefs.begin("relay_state", true);

  StaticJsonDocument<512> doc;
  JsonArray array = doc.to<JsonArray>();

  for (int i = 0; i < numRelays; i++) {
    int savedState = prefs.getInt(String(relayConfigs[i].id).c_str(), -1);
    if (savedState != -1) {
      mcp.digitalWrite(relayConfigs[i].pin, savedState ? HIGH : LOW);

      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = relayConfigs[i].id;
      obj["value"] = String(savedState);
      obj["messageType"] = "SWITCH";
      obj["status"] = "Active";

      Serial.printf("[Restore] Relay %d set to %d\\n", relayConfigs[i].id, savedState);
    }
  }

  prefs.end();

  // Only publish if there is at least one restored state
  if (!array.isNull() && array.size() > 0) {
    char jsonBuffer[512];
    size_t len = serializeJson(doc, jsonBuffer);
    client.publish(dataTopic.c_str(), jsonBuffer, len);

    Serial.println("[MQTT] Sent restored relay states:");
    serializeJsonPretty(doc, Serial);
    Serial.println();
  }
}`:``}

void setup_ethernet() {
  Serial.println("[Ethernet] Initializing Ethernet...");
  Ethernet.init(W5500_CS); // Initialize Ethernet shield CS pin
  delay(10); // Small delay for hardware initialization

  // Attempt to configure Ethernet with static IP
  Ethernet.begin(mac, ip, dnsServer, gateway, subnet);

  // Check for Ethernet link status and print IP
  unsigned long startAttemptTime = millis();
  while (Ethernet.linkStatus() == LinkOFF && millis() - startAttemptTime < 10000) {
    Serial.print(".");
    delay(500);
  }

  if (Ethernet.linkStatus() == LinkON) {
    Serial.println("\\n[Ethernet] Connected!");
    Serial.print("[Ethernet] IP address: ");
    Serial.println(Ethernet.localIP());
  } else {
    Serial.println("\\n[Ethernet] Link is OFF or failed to get IP. Retrying...");
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("[MQTT] Message arrived on topic: ");
  Serial.println(topic);
  ${isSwitch ? `// Copy payload to a char buffer and null-terminate
  char message[length + 1];
  memcpy(message, payload, length);
  message[length] = '\\0';

  Serial.print("[MQTT] Payload: ");
  Serial.println(message);

  StaticJsonDocument<512> doc;
  DeserializationError error = deserializeJson(doc, message);
  if (error) {
    Serial.print("[MQTT] JSON deserialization failed: ");
    Serial.println(error.c_str());
    return;
  }

  // Extract values
  int deviceId = doc["deviceId"].as<int>();
  int value = doc["value"].as<int>();
  const char* type = doc["messageType"];

  if (strcmp(type, "SWITCH") == 0) {
    for (int i = 0; i < numRelays; i++) {
      if (relayConfigs[i].id == deviceId) {
        mcp.digitalWrite(relayConfigs[i].pin, value ? HIGH : LOW);
        saveRelayState(deviceId, value);
        Serial.printf("[Relay] Set relay with ID %d (pin %d) to %d\\n", deviceId, relayConfigs[i].pin, value);
        return;
      }
    }
    Serial.printf("[Relay] No relay found with deviceId %d\\n", deviceId);
  }`:``}  
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("[MQTT] Attempting connection to broker... ");
    if (client.connect("${esp32RoomId}", mqtt_user, mqtt_password, statusTopic.c_str(), 1, true, "offline")) {
      Serial.println("connected.");

      // Subscribe to room-specific control topic
      client.subscribe(controlTopic.c_str());
      Serial.print("[MQTT] Subscribed to ");
      Serial.println(controlTopic);

      // Publish "online" status with retain flag
      client.publish(statusTopic.c_str(), "online", true);
      delay(1000);
      restoreRelayStates();
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" - retrying in 5 seconds...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);${isPM2_5 ? `\n  pmsSerial.begin(9600, SERIAL_8N1, RX1_PIN, TX1_PIN);`:``}${isPower ? `\n  mySerial1.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);` : ``} ${isPM2_5 ? `\n
  for (int i = 0; i < 3; i++) {
    pms.wakeUp();
    pms.requestRead();
    pms.readUntil(data);
    delay(1000);
  }` : ``}  
  ${isTemperature || isHumidity ? `
  dht.begin();
  delay(2000);${isHumidity? `\n  dht.readHumidity();` : ``}${isTemperature ? `\n  dht.readTemperature();` : ''} 
  ` : ``}${isSwitch ? `\n  Wire.begin();
  if (!mcp.begin_I2C()) {
    Serial.println("Error initializing MCP23017!");
    while (1);
  }
  for (int i = 0; i < numRelays; i++) {
    mcp.pinMode(relayConfigs[i].pin, OUTPUT);
  }
  `:``}
  setup_ethernet();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
    
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("[Ethernet] Link is down. Attempting to reconnect...");
    Ethernet.begin(mac, ip, dnsServer, gateway, subnet);
    delay(1000);
    if (Ethernet.linkStatus() == LinkON) {
      Serial.println("[Ethernet] Link restored.");
    } else {
      Serial.println("[Ethernet] Still disconnected.");
      delay(5000); 
      return;      
    }
  }
  if (!client.connected()) {
    reconnect();  
  }

  client.loop();${isTemperature || isHumidity || isPM2_5 || isPower ? `
  unsigned long now = millis();
  if (now - lastMsgTime > interval) {
    lastMsgTime = now;

    StaticJsonDocument<512> doc;
    JsonArray array = doc.to<JsonArray>();${isTemperature || isHumidity ? `
    // DHT Read${isHumidity ? `\n    float h = dht.readHumidity();
    if (!isnan(h)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(HUMIDITY_ID);
      obj["value"] = String(h, 1);
      obj["messageType"] = "HUMIDITY";
      obj["status"] = "Active";
    }` : ``} ${isTemperature ? `\n    float t = dht.readTemperature(); 
    if (!isnan(t)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(DHT_ID);
      obj["value"] = String(t, 1);
      obj["messageType"] = "TEMPERATURE";
      obj["status"] = "Active";
    }` : ''}` : ''
    }       
    ${isPM2_5 ? `
    // PM2.5 Read
    pms.wakeUp();
    pms.requestRead();
    if (pms.readUntil(data)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(PM2_5_ID);
      obj["value"] = String(data.PM_AE_UG_2_5);
      obj["messageType"] = "PM2_5";
      obj["status"] = "Active";
    } else {
      Serial.println("Failed to read data from PMS5003.");
    }
    ` : ``}${isPower ? `
    // Read voltage
    float voltage = pzem.voltage();
    if (!isnan(voltage)) {
      Serial.print("Voltage: ");
      Serial.print(voltage);
      Serial.println("V");
    } else {
      Serial.println("Error reading voltage");
    }

    // Read power
    float power = pzem.power();
    if (!isnan(power)) {
      Serial.print("Power: ");
      Serial.print(power);
      Serial.println("W");
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(POWER_ID);
      obj["value"] = String(power);
      obj["messageType"] = "POWER";
      obj["status"] = "Active";
    } else {
      Serial.println("Error reading power");
    }
  `:``}
    // Serialize JSON and publish
    char buffer[512];
    size_t len = serializeJson(doc, buffer);
    if (client.publish(dataTopic.c_str(), buffer, len)) {
      Serial.println("[MQTT] Sent array:");
      serializeJsonPretty(doc, Serial);
      Serial.println();
    } else {
      Serial.println("[MQTT] Failed to send JSON.");
      Serial.print("[MQTT] JSON size: ");
      Serial.println(measureJson(doc));
    }
  }`:``}  
}

`;

const esp32WifiCode = `#include <WiFi.h>
#include <PubSubClient.h>${isTemperature || isHumidity ? `\n#include "DHT.h"` : ``}${isPM2_5 ? `\n#include <PMS.h>` : ``}
#include <ArduinoJson.h>${isSwitch ? `\n#include <Wire.h>
#include <Adafruit_MCP23X17.h>` : ``}${isPower ? `\n#include <PZEM004Tv30.h>`:``}
#include <Preferences.h>

// LocalStorage
// =============================================
Preferences prefs;${isTemperature || isHumidity ?
        `
//==============================================
// DHT SENSOR
#define DHTPIN YOUR_DHT_PIN
#define DHTTYPE DHT21 ${isTemperature ? `\n#define DHT_ID ${tempId}` : ''} ${isHumidity ? `\n#define HUMIDITY_ID ${humId}` : ''}
DHT dht(DHTPIN, DHTTYPE);`:``
    }${isPM2_5 ? `
//==============================================
// PM2.5 SENSOR
#define RX1_PIN YOUR_RX1_PIN
#define TX1_PIN YOUR_TX1_PIN
#define PM2_5_ID ${pm2_5Id}
HardwareSerial pmsSerial(2);
PMS pms(pmsSerial);
PMS::DATA data;`:``}${isSwitch ? generateRelayConfigForWifi() : ''}${isPower ? `
//==============================================
// Power Sensor
#define RX2_PIN YOUR_RX2_PIN
#define TX2_PIN YOUR_TX2_PIN
#define POWER_ID ${powerId}
HardwareSerial mySerial1(1);
PZEM004Tv30 pzem(mySerial1, RX2_PIN, TX2_PIN);
`:``}
// =============================================
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "149.130.222.18";
const int mqtt_port = 1883;
const char* mqtt_user = "eichanudom";
const char* mqtt_password = "Domkh@#12";

// Unique room ID
const char* roomId = "${esp32RoomId}";

// Topics (dynamically built from roomId)
String statusTopic = String("/room/") + roomId + "/status";
String dataTopic = String("/room/") + roomId + "/data";
String controlTopic = String("/room/") + roomId + "/control";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsgTime = 0;
const long interval = 2000;${isSwitch ? `\n
void saveRelayState(int deviceId, int value) {
  prefs.begin("relay_state", false);
  prefs.putInt(String(deviceId).c_str(), value);
  prefs.end();
}

void clearRelayStates() {
  prefs.begin("relay_state", false);
  prefs.clear();
  prefs.end();
}

void restoreRelayStates() {
  prefs.begin("relay_state", true);

  StaticJsonDocument<512> doc;
  JsonArray array = doc.to<JsonArray>();

  for (int i = 0; i < numRelays; i++) {
    int savedState = prefs.getInt(String(relayConfigs[i].id).c_str(), -1);
    if (savedState != -1) {
      mcp.digitalWrite(relayConfigs[i].pin, savedState ? HIGH : LOW);

      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = relayConfigs[i].id;
      obj["value"] = String(savedState);
      obj["messageType"] = "SWITCH";
      obj["status"] = "Active";

      Serial.printf("[Restore] Relay %d set to %d\\n", relayConfigs[i].id, savedState);
    }
  }

  prefs.end();

  // Only publish if there is at least one restored state
  if (!array.isNull() && array.size() > 0) {
    char jsonBuffer[512];
    size_t len = serializeJson(doc, jsonBuffer);
    client.publish(dataTopic.c_str(), jsonBuffer, len);

    Serial.println("[MQTT] Sent restored relay states:");
    serializeJsonPretty(doc, Serial);
    Serial.println();
  }
}`:``}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.println("[WiFi] Connecting to WiFi...");
  WiFi.begin(ssid, password);

  int retry_count = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    retry_count++;
    if (retry_count > 20) {
      Serial.println("\\n[WiFi] Failed to connect after 10 seconds.");
      return;
    }
  }

  Serial.println("\\n[WiFi] Connected to WiFi");
  Serial.print("[WiFi] IP address: ");
  Serial.println(WiFi.localIP());  
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("[MQTT] Message arrived on topic: ");
  Serial.println(topic);
  ${isSwitch ? `// Copy payload to a char buffer and null-terminate
  char message[length + 1];
  memcpy(message, payload, length);
  message[length] = '\\0';

  Serial.print("[MQTT] Payload: ");
  Serial.println(message);

  StaticJsonDocument<512> doc;
  DeserializationError error = deserializeJson(doc, message);
  if (error) {
    Serial.print("[MQTT] JSON deserialization failed: ");
    Serial.println(error.c_str());
    return;
  }

  // Extract values
  int deviceId = doc["deviceId"].as<int>();
  int value = doc["value"].as<int>();
  const char* type = doc["messageType"];

  if (strcmp(type, "SWITCH") == 0) {
    for (int i = 0; i < numRelays; i++) {
      if (relayConfigs[i].id == deviceId) {
        mcp.digitalWrite(relayConfigs[i].pin, value ? HIGH : LOW);
        saveRelayState(deviceId, value);
        Serial.printf("[Relay] Set relay with ID %d (pin %d) to %d\\n", deviceId, relayConfigs[i].pin, value);
        return;
      }
    }
    Serial.printf("[Relay] No relay found with deviceId %d\\n", deviceId);
  }`:``}  
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("[MQTT] Attempting connection to broker... ");
    if (client.connect("${esp32RoomId}", mqtt_user, mqtt_password, statusTopic.c_str(), 1, true, "offline")) {
      Serial.println("connected.");

      // Subscribe to room-specific control topic
      client.subscribe(controlTopic.c_str());
      Serial.print("[MQTT] Subscribed to ");
      Serial.println(controlTopic);

      // Publish "online" status with retain flag
      client.publish(statusTopic.c_str(), "online", true);
      delay(1000);
      restoreRelayStates();
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" - retrying in 5 seconds...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);${isPM2_5 ? `\n  pmsSerial.begin(9600, SERIAL_8N1, RX1_PIN, TX1_PIN);`:``}${isPower ? `\n  mySerial1.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);` : ``} ${isPM2_5 ? `\n
  for (int i = 0; i < 3; i++) {
    pms.wakeUp();
    pms.requestRead();
    pms.readUntil(data);
    delay(1000);
  }` : ``}  
  ${isTemperature || isHumidity ? `
  dht.begin();
  delay(2000);${isHumidity? `\n  dht.readHumidity();` : ``}${isTemperature ? `\n  dht.readTemperature();` : ''} 
  ` : ``}${isSwitch ? `\n  Wire.begin();
  if (!mcp.begin_I2C()) {
    Serial.println("Error initializing MCP23017!");
    while (1);
  }
  for (int i = 0; i < numRelays; i++) {
    mcp.pinMode(relayConfigs[i].pin, OUTPUT);
  }
  `:``}
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Loop] WiFi disconnected. Attempting to reconnect WiFi...");
    setup_wifi(); 
    delay(5000); 
    return;    
  }
  if (!client.connected()) {
    Serial.println("[Loop] MQTT disconnected. Attempting to reconnect MQTT...");
    reconnect();
    delay(1000);
    return;
  }
  client.loop();${isTemperature || isHumidity || isPM2_5 || isPower ? `
  unsigned long now = millis();
  if (now - lastMsgTime > interval) {
    lastMsgTime = now;

    StaticJsonDocument<512> doc;
    JsonArray array = doc.to<JsonArray>();${isTemperature || isHumidity ? `
    // DHT Read${isHumidity ? `\n    float h = dht.readHumidity();
    if (!isnan(h)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(HUMIDITY_ID);
      obj["value"] = String(h, 1);
      obj["messageType"] = "HUMIDITY";
      obj["status"] = "Active";
    }` : ``} ${isTemperature ? `\n    float t = dht.readTemperature(); 
    if (!isnan(t)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(DHT_ID);
      obj["value"] = String(t, 1);
      obj["messageType"] = "TEMPERATURE";
      obj["status"] = "Active";
    }` : ''}` : ''
    }       
    ${isPM2_5 ? `
    // PM2.5 Read
    pms.wakeUp();
    pms.requestRead();
    if (pms.readUntil(data)) {
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(PM2_5_ID);
      obj["value"] = String(data.PM_AE_UG_2_5);
      obj["messageType"] = "PM2_5";
      obj["status"] = "Active";
    } else {
      Serial.println("Failed to read data from PMS5003.");
    }
    ` : ``}${isPower ? `
    // Read voltage
    float voltage = pzem.voltage();
    if (!isnan(voltage)) {
      Serial.print("Voltage: ");
      Serial.print(voltage);
      Serial.println("V");
    } else {
      Serial.println("Error reading voltage");
    }

    // Read power
    float power = pzem.power();
    if (!isnan(power)) {
      Serial.print("Power: ");
      Serial.print(power);
      Serial.println("W");
      JsonObject obj = array.createNestedObject();
      obj["deviceId"] = String(POWER_ID);
      obj["value"] = String(power);
      obj["messageType"] = "POWER";
      obj["status"] = "Active";
    } else {
      Serial.println("Error reading power");
    }
  `:``}
    // Serialize JSON and publish
    char buffer[512];
    size_t len = serializeJson(doc, buffer);
    if (client.publish(dataTopic.c_str(), buffer, len)) {
      Serial.println("[MQTT] Sent array:");
      serializeJsonPretty(doc, Serial);
      Serial.println();
    } else {
      Serial.println("[MQTT] Failed to send JSON.");
      Serial.print("[MQTT] JSON size: ");
      Serial.println(measureJson(doc));
    }
  }`:``}  
}

`;

    const [selectedTab, setSelectedTab] = useState(0);
    // State for copy button feedback
    const [isCopied, setIsCopied] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState(t('copyCode'));

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setIsCopied(false);
        setTooltipTitle(t('copyCode')); // Reset tooltip
    };

    const handleClose = () => {
        dispatch(setIsOpenEsp32CodeModal(false));
        setSelectedTab(0);
        setIsCopied(false);
        setTooltipTitle(t('copyCode')); // Reset tooltip
    }

    const handleCopyCode = async () => {
        const codeToCopy = selectedTab === 0 ? esp32WifiCode : esp32EthernetCode;
        try {
            await navigator.clipboard.writeText(codeToCopy);
            setIsCopied(true);
            setTooltipTitle(t('copiedSuccessfully'));
            setTimeout(() => {
                setIsCopied(false);
                setTooltipTitle(t('copyCode'));
            }, 2000); // Revert after 2 seconds
        } catch (err) {
            console.error('Failed to copy code: ', err);
            setIsCopied(false);
            setTooltipTitle(t('failedToCopy')); // Set tooltip to error message
            setTimeout(() => {
                setTooltipTitle(t('copyCode'));
            }, 3000); // Revert after 3 seconds for errors
        }
    };

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="esp32-code-modal-title"
            aria-describedby="esp32-code-modal-description"
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: 'blur(2px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <Card
                sx={{
                    p: 2,
                    width: "90%",
                    maxWidth: "800px",
                    maxHeight: "90%",
                    overflowY: "auto",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Modal Header */}
                <Box
                    sx={{
                        padding: "1rem",
                        display: "flex",
                        mb: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                    }}
                >
                    <Typography id="esp32-code-modal-title" variant="h6" component="h2">
                        {t('codeEsp32')}
                    </Typography>
                    <IconButton onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Tab Bar */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="ESP32 code variants">
                        <Tab label={t('esp32WithWifi')} {...a11yProps(0)} />
                        <Tab label={t('esp32WithEthernet')} {...a11yProps(1)} />
                    </Tabs>
                </Box>

                {/* Tab Content & Copy Button */}
                <Box
                    id="esp32-code-modal-description"
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        position: 'relative', // Make this box the reference for absolute positioning
                    }}
                >
                    <CustomTabPanel value={selectedTab} index={0}>
                        {roomData.devicesQty === 0 ? (
                            <div className="flex justify-center items-center h-full flex-col py-10">
                                <img src={"/images/ic-content.svg"} alt="No Devices Found"/>
                                <Typography variant="body1">No Devices Found</Typography>
                            </div>
                        ):(
                            <>
                                <Tooltip title={"tooltipTitle"}  placement="top" arrow>
                                    <IconButton
                                        onClick={handleCopyCode}
                                        aria-label={t('copyCode')}
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 8,
                                            zIndex: 1,
                                            color: isCopied ? 'success.main' : 'action.active',
                                            bgcolor: isCopied ? 'success.light' : 'background.paper',
                                            borderRadius: '6px',
                                        }}
                                        size="small"
                                    >
                                        {isCopied ? <DoneIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <SyntaxHighlighter
                                    language="cpp"
                                    style={dracula}
                                    showLineNumbers
                                    wrapLines
                                    customStyle={{
                                        fontSize: '0.85rem',
                                        paddingTop: '3.5rem',
                                        paddingLeft: '1rem',
                                        paddingRight: '1rem',
                                        paddingBottom: '1rem',
                                        borderRadius: '4px',
                                    }}
                                >
                                    {esp32WifiCode}`
                                </SyntaxHighlighter>
                            </>
                        )}

                    </CustomTabPanel>
                    <CustomTabPanel value={selectedTab} index={1}>
                        {roomData.devicesQty === 0 ? (
                            <div className="flex justify-center items-center h-full flex-col py-10">
                                <img src={"/images/ic-content.svg"} alt="No Devices Found"/>
                                <Typography variant="body1">No Devices Found</Typography>
                            </div>
                        ):(
                            <>
                                <Tooltip title={"tooltipTitle"}  placement="top" arrow>
                                    <IconButton
                                        onClick={handleCopyCode}
                                        aria-label={t('copyCode')}
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 8,
                                            zIndex: 1,
                                            color: isCopied ? 'success.main' : 'action.active',
                                            bgcolor: isCopied ? 'success.light' : 'background.paper',
                                            borderRadius: '6px',
                                        }}
                                        size="small"
                                    >
                                        {isCopied ? <DoneIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <SyntaxHighlighter
                                    language="cpp"
                                    style={dracula}
                                    showLineNumbers
                                    wrapLines
                                    customStyle={{
                                        fontSize: '0.85rem',
                                        paddingTop: '3.5rem',
                                        paddingLeft: '1rem',
                                        paddingRight: '1rem',
                                        paddingBottom: '1rem',
                                        borderRadius: '4px',
                                    }}
                                >
                                    {esp32EthernetCode}
                                </SyntaxHighlighter>
                            </>
                        )}

                    </CustomTabPanel>
                </Box>
            </Card>
        </Modal>
    )
}

export default ModalCodeEsp32Component;