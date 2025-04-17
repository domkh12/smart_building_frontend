import React from 'react'
import { Tabs,Checkbox, Table ,Button,Popover, Avatar } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5"
import { RiInboxArchiveLine } from "react-icons/ri";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdOutlineDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { VscMailRead } from "react-icons/vsc";
import { CiInboxIn } from "react-icons/ci";
import { MdCommentsDisabled } from "react-icons/md";

function MessagesList() {
  const content=(
    <div className="w-15 text-sm text-gray-500 dark:text-gray-400 ">
    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">Save</h3>
    </div>
  </div>
  );
  const content1=(
    <div className="w-15 text-sm text-gray-500 dark:text-gray-400 ">
    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">Stop</h3>
    </div>
  </div>
  );
  const content2=(
    <div className="w-15 text-sm text-gray-500 dark:text-gray-400 ">
    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">Read</h3>
    </div>
  </div>
  );
  const content3=(
    <div className="w-15 text-sm text-gray-500 dark:text-gray-400 ">
    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">Delete</h3>
    </div>
  </div>
  );
  return (
    <>
    {/* // menu items */}
      <div className='m-5'>
        <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2 ">
          <input id="npm-install" type="text"
              className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
              value="Search Email"
            />
            <Button className="bg-primary hover:bg-primary-hover focus:ring-0 w-20"   ><CiSearch size="20px "/>Search</Button>     
        </div>
      </div>
      <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" variant="fullWidth">
          <Tabs.Item active title="Inbox" icon={CiInboxIn}></Tabs.Item>
            <Tabs.Item title="Read" icon={VscMailRead} ></Tabs.Item>
          <Tabs.Item title="Stop" icon={IoTimeOutline }></Tabs.Item>
          <Tabs.Item title="Save" icon={RiInboxArchiveLine}></Tabs.Item>
          <Tabs.Item title="Update" icon={GrUpdate } ></Tabs.Item>
          <Tabs.Item title="disabled " icon={MdCommentsDisabled }>
          </Tabs.Item>
        </Tabs>
      </div>
      {/* //table information */}
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Body className="divide-y"> 
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-400/20">
              <Table.Cell className="p-4"><Checkbox /></Table.Cell>
              <Table.Cell className="p-4 float-left rounded bordered " color="gray">  
                 <Avatar className='' img="https://th.bing.com/th/id/OIP.5or3H-P94CskwECcfCmY3gHaHa?rs=1&pid=ImgDetMain" rounded status="away" bordered color="orage" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white float-left ">
                <h1 className='py-1 font-bold'>NAI KONG</h1>
                <p>
                  Hi! how are you?...10mn
                </p>
                </Table.Cell>
                <Table.Cell>
                <a href="#" className="flex justify-start items-center  underline underline-offset-2 cursor-pointer text-nowrap text-blue-600  float-right">               
                      <a href="#">                       
                        <div className="flex gap-2">
                          <Popover content={content} placement="top" trigger="hover" >
                            <button type="button" class="text-white rounded-md bg-gradient-to-r bg-blue-800  to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <RiInboxArchiveLine className='size-4'/> </button>
                          </Popover>
                        </div>   
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                          <Popover content={content1} placement="top" trigger="hover" >
                            <button type="button" class="text-white bg-gradient-to-r  bg-yellow-400 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><IoTimeOutline className='size-4'/>
                            </button>
                          </Popover>
                        </div>
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                            <Popover content={content2} placement="top" trigger="hover" >
                              <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><SlEnvolopeLetter className='size-4'/></button>
                            </Popover>
                        </div>
                      </a>
                  <a href="#">
                    <div className="flex gap-2">
                      <Popover content={content3} placement="top" trigger="hover" >
                        <button type="button" class="text-white bg-gradient-to-r bg-red-600 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-md"><MdOutlineDelete className='size-4'/></button>
                      </Popover>
                    </div>         
                  </a>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-400/20">
              <Table.Cell className="p-4"><Checkbox /></Table.Cell>
              <Table.Cell className="p-4 float-left rounded bordered " color="gray">  
                 <Avatar className='' img="https://th.bing.com/th/id/R.24f364b656e39efa6e9b350d91ff73b9?rik=YJpd3sza6kYHyg&pid=ImgRaw&r=0" rounded status="away" bordered color="orage" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white float-left ">
                <h1 className='py-1 font-bold'>EI CHANUDOM</h1>
                <p>
                  Hi! how are you?...10mn
                </p>
                </Table.Cell>
                <Table.Cell>
                <a href="#" className="flex justify-start items-center  underline underline-offset-2 cursor-pointer text-nowrap text-blue-600  float-right">               
                      <a href="#">                       
                        <div className="flex gap-2">
                          <Popover content={content} placement="top" trigger="hover" >
                            <button type="button" class="text-white rounded-md bg-gradient-to-r bg-blue-800  to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <RiInboxArchiveLine className='size-4'/> </button>
                          </Popover>
                        </div>   
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                          <Popover content={content1} placement="top" trigger="hover" >
                            <button type="button" class="text-white bg-gradient-to-r  bg-yellow-400 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><IoTimeOutline className='size-4'/></button>
                          </Popover>
                        </div>
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                            <Popover content={content2} placement="top" trigger="hover" >
                              <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><SlEnvolopeLetter className='size-4'/></button>
                            </Popover>
                        </div>
                      </a>
                  <a href="#">
                    <div className="flex gap-2">
                      <Popover content={content3} placement="top" trigger="hover" >
                        <button type="button" class="text-white bg-gradient-to-r bg-red-600 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-md"><MdOutlineDelete className='size-4'/></button>
                      </Popover>
                    </div>         
                  </a>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-400/20">
              <Table.Cell className="p-4"><Checkbox /></Table.Cell>
              <Table.Cell className="p-4 float-left rounded bordered " color="gray">  
                 <Avatar className='' img="https://th.bing.com/th/id/R.5bfafeb73a16e098698d29ac1f322991?rik=lREg8T27L0BGtQ&pid=ImgRaw&r=0" rounded status="away" bordered color="orage" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white float-left ">
                <h1 className='py-1 font-bold'>NGET VICHETPHANHA</h1>
                <p>
                  Hi! how are you?...10mn
                </p>
                </Table.Cell>
                <Table.Cell>
                <a href="#" className="flex justify-start items-center  underline underline-offset-2 cursor-pointer text-nowrap text-blue-600  float-right">               
                      <a href="#">                       
                        <div className="flex gap-2">
                          <Popover content={content} placement="top" trigger="hover" >
                            <button type="button" class="text-white rounded-md bg-gradient-to-r bg-blue-800  to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <RiInboxArchiveLine className='size-4'/> </button>
                          </Popover>
                        </div>   
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                          <Popover content={content1} placement="top" trigger="hover" >
                            <button type="button" class="text-white bg-gradient-to-r  bg-yellow-400 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><IoTimeOutline className='size-4'/></button>
                          </Popover>
                        </div>
                      </a>
                      <a href="#">
                        <div className="flex gap-2">
                            <Popover content={content2} placement="top" trigger="hover" >
                              <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"><SlEnvolopeLetter className='size-4'/></button>
                            </Popover>
                        </div>
                      </a>
                  <a href="#">
                    <div className="flex gap-2">
                      <Popover content={content3} placement="top" trigger="hover" >
                        <button type="button" class="text-white bg-gradient-to-r bg-red-600 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-md"><MdOutlineDelete className='size-4'/></button>
                      </Popover>
                    </div>         
                  </a>
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default MessagesList
