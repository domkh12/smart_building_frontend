// src/components/SortableDeviceSection.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ToggleSwitchButtonComponent from './ToggleSwitchButtonComponent'; // Adjust path if needed
import DataNotFound from './DataNotFound'; // Adjust path if needed

/**
 * Renders a single draggable and sortable section for a device type.
 * It displays devices belonging to this type and provides a drag handle.
 *
 * @param {object} props - The component props.
 * @param {object} props.deviceType - The device type object (e.g., { id: 'lights', name: 'Lights' }).
 * @param {object} props.roomFetchedById - The current room data, including its devices.
 * @param {string} props.searchTerm - The current search term for filtering devices.
 * @param {Array} props.messages - WebSocket messages for device control.
 * @param {Function} props.sendMessage - Function to send messages via WebSocket.
 */
export function SortableDeviceSection({
                                          deviceType,
                                          roomFetchedById,
                                          searchTerm,
                                          messages,
                                          sendMessage,
                                      }) {
    // useSortable hook provides the necessary props and state for a sortable item.
    // The 'id' property is crucial and must be unique for each sortable item.
    const {
        attributes, // Accessibility attributes for the draggable element
        listeners, // Event listeners to activate dragging (e.g., onMouseDown, onTouchStart)
        setNodeRef, // Ref to attach to the DOM node that will be draggable
        transform, // CSS transform properties for smooth dragging animation
        transition, // CSS transition properties
        isDragging, // Boolean indicating if the item is currently being dragged
    } = useSortable({ id: deviceType.id }); // Use deviceType.id as the unique ID for sorting

    // Apply CSS transforms for smooth dragging animation.
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // When dragging, bring the item to the front (higher z-index)
        // and make it slightly transparent for better visual feedback.
        zIndex: isDragging ? 2000 : 'auto', // Ensure dragged item is above others
        opacity: isDragging ? 0.7 : 1, // Visual feedback when dragging
        boxShadow: isDragging ? '0px 8px 16px rgba(0, 0, 0, 0.2)' : 'none', // Enhanced shadow
        // Added margin-bottom to separate cards slightly when reordered
        marginBottom: '20px',
    };

    // Filter devices to only show those that match the current deviceType and search term.
    const matchingDevices = roomFetchedById?.data?.devices?.filter(
        (device) =>
            device.deviceType?.id === deviceType?.id &&
            (searchTerm === "" || device.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // If there are no matching devices for this device type after filtering, don't render the section.
    if (!matchingDevices || matchingDevices.length === 0) {
        return null;
    }

    return (
        // Attach the ref from useSortable to the main Card component.
        // Apply the dnd-kit style properties.
        <Card
            ref={setNodeRef}
            style={style}
            // sx={{ ... }} // Inherit MUI card styles or add custom ones here
            sx={{
                width: "100%",
                borderRadius: '8px', // Slightly rounded corners for the card
                // Cursor style based on isDragging, not on `isDraggable` prop
                // because the long press is handled by the PointerSensor at DndContext level.
                cursor: 'default', // Default cursor for the card
                userSelect: 'none', // Prevent text selection during drag
            }}
        >
            {/*
        The drag handle is the part of the component that the user
        interacts with to initiate the drag. In this case, it's the
        device type name header.
        `attributes` provides accessibility props (like `role`, `tabIndex`).
        `listeners` provides event handlers (like `onMouseDown`, `onTouchStart`)
        that initiate the drag operation.
      */}
            <div
                className="absolute -top-4 left-5 bg-black text-white px-6 py-2 rounded-full"
                {...attributes} // Apply accessibility attributes
                {...listeners} // Apply event listeners for dragging
                style={{ cursor: isDragging ? 'grabbing' : 'grab', zIndex: 10 }} // Cursor feedback on handle
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {deviceType.name}
                </Typography>
            </div>

            <div
                // This div contains the actual device toggle buttons.
                className="grid grid-cols-1 relative px-[20px] gap-[10px] py-[20px] xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 pt-10"
            >
                {matchingDevices.map((filteredDevice) => (
                    <ToggleSwitchButtonComponent
                        device={filteredDevice}
                        key={filteredDevice?.id}
                        messages={messages}
                        sendMessage={sendMessage}
                    />
                ))}
            </div>
        </Card>
    );
}
