import { Checkbox, Table } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { Button } from "flowbite-react";
import { RiUserAddFill } from "react-icons/ri";
import { IoIosPrint } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { MdEditSquare } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { BiSort } from "react-icons/bi";
function Usermanager() {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap gap-2">
        <Button
          as="span"
          className="cursor-pointer bg-primary  transition duration-300 ease-in-out ..."
        >
          <RiUserAddFill />
          Add Employee
        </Button>
        <Button className=" bg-primary  ">
          <IoIosPrint />
          Print
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell className="flex">
            Staff ID <BiSort />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Photo</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Department</Table.HeadCell>
          <Table.HeadCell>Designation</Table.HeadCell>
          <Table.HeadCell> Phone Number</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Nationality</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              <BiDetail />
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              NPIC-0001
            </Table.Cell>
            <Table.Cell>Chorn David</Table.Cell>
            <Table.Cell>
              <Avatar
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSN5kyGXRsJTnCvfM371Ycg8u7k9viw1gW-g&s"
                alt="avatar of Jese"
                rounded
              />
            </Table.Cell>
            <Table.Cell>Male</Table.Cell>
            <Table.Cell>IT Support</Table.Cell>
            <Table.Cell>Office</Table.Cell>
            <Table.Cell>Office</Table.Cell>
            <Table.Cell>0123654789</Table.Cell>
            <Table.Cell>david@gmai.com</Table.Cell>
            <Table.Cell>Khmer</Table.Cell>
            <Table.Cell className="flex">
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <BiDetail className="mr-5 h-5 w-5 " />
              </a>
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <MdEditSquare className="mr-5 h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <MdAutoDelete className="mr-5 h-5 w-5" />
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              NPIC-0002
            </Table.Cell>
            <Table.Cell>Nget Vichetpanha</Table.Cell>
            <Table.Cell>
              {" "}
              <Avatar
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0gQnaMzL3UHAIbUCQi-DeExFsXLwH-N0MA&s"
                alt="avatar of Jese"
                rounded
              />
            </Table.Cell>
            <Table.Cell>Male</Table.Cell>
            <Table.Cell>IT Support</Table.Cell>
            <Table.Cell>Office</Table.Cell>
            <Table.Cell>Office</Table.Cell>
            <Table.Cell>0123654789</Table.Cell>
            <Table.Cell>david@gmai.com</Table.Cell>
            <Table.Cell>Khmer</Table.Cell>
            <Table.Cell className="flex">
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <BiDetail className="mr-5 h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <MdEditSquare className="mr-5 h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <MdAutoDelete className="mr-5 h-5 w-5" />
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default Usermanager;
