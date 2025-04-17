import Maintenance from "../../components/util/Mauntenance";
import { Button, Checkbox, Table } from "flowbite-react";
import { BsPrinterFill } from "react-icons/bs";

function Vehicle() {
  return (
    <div className="overflow-x-auto">
      <Button color="blue" className="flex justify-center items-center gap-5">
        <BsPrinterFill className="mr-2 h-5 w-5" />
        Print
      </Button>
      <Table hoverable>
        <Table.Head className="text-lg">
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Vehicle Name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Number plate</Table.HeadCell>
          <Table.HeadCell>Time In</Table.HeadCell>
          <Table.HeadCell>Time Out</Table.HeadCell>
          <Table.HeadCell>Total Time</Table.HeadCell>
          <Table.HeadCell>status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-lg">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {"TOYOTA"}
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>1CT-1217</Table.Cell>
            <Table.Cell>8:00am</Table.Cell>
            <Table.Cell>5:00pm</Table.Cell>
            <Table.Cell>9:00h</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              BMW
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>1CT-1218</Table.Cell>
            <Table.Cell>8:39am</Table.Cell>
            <Table.Cell>4:39am</Table.Cell>
            <Table.Cell>7:00h</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              lamborghini
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>1CT-1217</Table.Cell>
            <Table.Cell>8:20am</Table.Cell>
            <Table.Cell>3:39am</Table.Cell>
            <Table.Cell>5:00h</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default Vehicle;
