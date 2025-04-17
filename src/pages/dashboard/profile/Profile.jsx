"use client";
import { Avatar } from "flowbite-react";
import { Card} from "flowbite-react";
import { Table } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import {TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Kbd } from "flowbite-react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { BiDetail } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { Dropdown } from "flowbite-react";
import { Banner } from "flowbite-react";
import { FcLeave } from "react-icons/fc";
export function Profile() {
  return (
  <>
      <Card className="max-w-sm float-start ">
          <div className="flex flex-wrap gap-2">
        <Avatar img="https://th.bing.com/th/id/OIP.TzP2op3lkhlTh6oOHamacAHaHa?rs=1&pid=ImgDetMain" size="xl" style={{ padding: "10% 25%"}} alt="avatar of Jese" rounded />
          </div>
        <h5 className="mb-2 text-3xl font-bold text-gray-700 dark:text-white "style={{textAlign :"center"}}> NAI KONG</h5>
        <div className="overflow-x-auto">
        <Table>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Staff ID"'}
              </Table.Cell>
              <Table.Cell>NPIC0001</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Role
              </Table.Cell>
              <Table.Cell>Teacher</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Designation</Table.Cell>
              <Table.Cell>IT Sopport</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Department
              </Table.Cell>
              <Table.Cell>IT Department</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white float-right">Conact Type</Table.Cell>
              <Table.Cell>0123654789</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Address</Table.Cell>
              <Table.Cell>Phnom Penh</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Date Of Join</Table.Cell>
              <Table.Cell>12/02/2024</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      </Card>
      {/* Profile Imformation */}
   <div className=" float-none shadow-inner dark:text-white bg-white  dark:border-gray-700 dark:bg-gray-800" >
      <Tabs aria-label="Default tabs" variant="default" >
      <Tabs.Item active title="Profile" icon={HiUserCircle}>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Phone
                        </th>
                        <td class="px-6 py-4">
                            0123654789
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Emergency Contact Number
                        </th>
                        <td class="px-6 py-4">
                            0123654789
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                        
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Email
                        </th>
                        <td class="px-6 py-4">
                           naikong@gmail.com
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                     
                           <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Gender
                        </th>
                        <td class="px-6 py-4">
                          Female
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                      
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Date of Birth
                        </th>
                        <td class="px-6 py-4">
                           03/12/2003
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                     
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Marital status 
                        </th>
                        <td class="px-6 py-4">
                            Single 
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                       
                         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Father Name
                        </th>
                        <td class="px-6 py-4">
                            Nai kong
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                    
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Mother Name
                        </th>
                        <td class="px-6 py-4">
                            Nai KOng
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                      
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Qualityfication
                        </th>
                        <td class="px-6 py-4">
                            IT Y2
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                 
                               <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Work Exsperience
                        </th>
                        <td class="px-6 py-4">
                            No
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                       
                         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Nationality
                        </th>
                        <td class="px-6 py-4">
                            Khmer
                        </td>
                      </tr>
                     
                      
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                      
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Address
                        </th>
                        <td class="px-6 py-4">
                            Phnom Penh
                        </td>
                      </tr>  
                </tbody>
            </table>
        </div>

      </Tabs.Item>
      {/* payroll Imformation */}
      <Tabs.Item title="Payroll" icon={MdOutlinePayment} className=" float-left ">
          <div className="flex flex-wrap gap-1">
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium-90 text-gray-900 whitespace-nowrap "> 
              <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Net Salary Paid</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"><MdOutlineAttachMoney /></h3>0</p>
                    <i className="text-5xl float-right mt-4"><FaRegMoneyBillAlt /></i>
              </div>
          </Kbd>
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap">
             
             <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Gross Salary</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"><MdOutlineAttachMoney /></h3>0</p>
                  <i className="text-5xl float-right mt-4"><FaRegMoneyBillAlt /></i>
              </div>
          </Kbd>
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap"> 
            
            <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Earning</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"><MdOutlineAttachMoney /></h3>0</p>
                  <i className="text-5xl float-right mt-4"><FaRegMoneyBillAlt /></i>
              </div>
          </Kbd>
          <Kbd className="w-56 min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap"> 
            
            <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Deduction</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"><MdOutlineAttachMoney /></h3>0</p>
                  <i className="text-5xl float-right mt-4"><FaRegMoneyBillAlt /></i>
              </div>
          </Kbd>
        </div>

        {/* // table payroll */}
        <div className="overflow-x-auto pt-6 border-solid bg-white dark:border-gray-700 dark:bg-gray-800  ">
          <Table hoverable>
            <TableHead className="border-solid bg-white dark:border-gray-700 dark:bg-gray-800 ">
              <TableHeadCell>Payslip</TableHeadCell>
              <TableHeadCell>Month-Year</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Mode</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Net Salary</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-solid">
                <TableCell>Married</TableCell>
                <TableCell>02/12/2024</TableCell>
                <TableCell>1</TableCell>
                <TableCell>in siem reab</TableCell>
                <TableCell>1</TableCell>
                <TableCell>in siem reab</TableCell>
                <TableCell className=" ">
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ">
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left "><BiDetail /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><GrEdit /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><AiFillDelete /></i>
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-solid">
                <TableCell >Sick</TableCell>
                <TableCell>07/05/2024</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Sick</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Sick</TableCell>
                <TableCell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ">
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left "><BiDetail /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><GrEdit /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><AiFillDelete /></i>
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
            
          </Tabs.Item>
          {/* Leave Imformation */}
          <Tabs.Item title="Leaves" icon={FcLeave}>
          <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead className="border-solid bg-white dark:border-gray-700 dark:bg-gray-800 ">
              <TableHeadCell>Leave Type</TableHeadCell>
              <TableHeadCell>Leave Date</TableHeadCell>
              <TableHeadCell>Days</TableHeadCell>
              <TableHeadCell>Statuse</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-solid">
                <TableCell>Married</TableCell>
                <TableCell>02/12/2024</TableCell>
                <TableCell>1</TableCell>
                <TableCell>in siem reab</TableCell>
                <TableCell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ">
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left "><BiDetail /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><GrEdit /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><AiFillDelete /></i>
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-solid">
                <TableCell >Sick</TableCell>
                <TableCell>07/05/2024</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Sick</TableCell>
                <TableCell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ">
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left "><BiDetail /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><GrEdit /></i>
                  <i className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 float-left"><AiFillDelete /></i>
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
      </Tabs.Item>
      {/* Attendance Information */}
      <Tabs.Item title="Attendance" icon={HiClipboardList} className=" float-left ">
          <div className="flex flex-wrap gap-1">
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium-90 text-gray-900 whitespace-nowrap "> 
              <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Present</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"></h3>0</p>
                    <i className="text-5xl float-right mt-4"><BiTask /></i>
              </div>
          </Kbd>
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap">
             
             <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Late</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"></h3>0</p>
                  <i className="text-5xl float-right mt-4"><BiTask /></i>
              </div>
          </Kbd>
          <Kbd className="w-56  min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap"> 
            
            <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Absent</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"></h3>0</p>
                  <i className="text-5xl float-right mt-4"><BiTask /></i>
              </div>
          </Kbd>
          <Kbd className="w-56 min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap"> 
            
            <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Half Day</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"></h3>0</p>
                  <i className="text-5xl float-right mt-4"><BiTask /></i>
              </div>
          </Kbd>
          <Kbd className="w-56 min-h-11 rounded-md ml-3 px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap mt-3"> 
            <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm  ">
                  <h1 className="font-medium text-sm ">Total Holiday</h1> 
                  <p className="text-3xl float-left mt-6">
                    <h3 className=" float-left"></h3>0</p>
                  <i className="text-5xl float-right mt-4"><BiTask /></i>
              </div>
          </Kbd>
          
        </div>
        <div className=" mt-3">
            <Dropdown label="Year " className="bg-indigo-500 font-medium text-gray-500 dark:text-white "  >
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Separated link</Dropdown.Item>
            </Dropdown>
        </div>
        <div>
        <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date|Months</Table.HeadCell>
          <Table.HeadCell>Jan</Table.HeadCell>
          <Table.HeadCell>Feb</Table.HeadCell>
          <Table.HeadCell>Mar</Table.HeadCell>
          <Table.HeadCell>Apr</Table.HeadCell>
          <Table.HeadCell>May</Table.HeadCell>
          <Table.HeadCell>Jun</Table.HeadCell>
          <Table.HeadCell>Jul</Table.HeadCell>
          <Table.HeadCell>Aug</Table.HeadCell>
          <Table.HeadCell>Sep</Table.HeadCell>
          <Table.HeadCell>Oct</Table.HeadCell>
          <Table.HeadCell>Nov</Table.HeadCell>
          <Table.HeadCell>Dec</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">01</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">02</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">03</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">04</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">05</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">06</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">07</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">08</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">09</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">10</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">11</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">12</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">13</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">14</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">15</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">16</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">17</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">18</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">19</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">20</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">21</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">22</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">23</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">24</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">25</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">26</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">27</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">28</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">29</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">30</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">31</Table.Cell></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
        </div>
      </Tabs.Item>
     
        <Tabs.Item title="Documents" icon={TiDocumentText}>
            <Banner>
            <div className=" min-h-12 flex w-full justify-between border-t border-gray-200p-4 dark:border-gray-600 dark:bg-gray-700  w-500 h-90 bg-gray-300 rounded-xl ">
              <div className="mx-auto flex items-center">
                <p> No Record Found</p>
              </div>
            </div>
          </Banner>
        </Tabs.Item>
            <Tabs.Item title="Edit" icon={ GrEdit }>
            <p> THis page is Edit</p>
          </Tabs.Item>
    </Tabs>
  </div>
  </>
);  
}
export default Profile;