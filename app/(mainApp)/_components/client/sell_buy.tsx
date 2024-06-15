'use client';

import { TabList, TabGroup, TabPanels, Tab, TabPanel } from '@headlessui/react';
import CreatePost from './CreatePost';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function BuySell({ children }: { children: React.ReactNode }) {
  const categories = ['Buy', 'Sell'];

  return (
        <TabGroup>
          <TabPanels className="mb-4">
            <TabPanel className="p-3 bg-white rounded-lg">
              <div className='pb-20 container mx-auto p-4">'>
                {children}
                {/* Agrega el contenido que desees para la opción "Buy" */}
              </div>
            </TabPanel>
            <TabPanel className="p-3 bg-white rounded-lg">
              <div className='pb-20'>
                <CreatePost />
                {/* Agrega el contenido que desees para la opción "Sell" */}
              </div>
            </TabPanel>
          </TabPanels>
          {/* <TabList className="flex rounded-xl bg-blue-900/20 p-1 fixed bottom-5 max-w-4xl w-full"> */}
          <TabList className="flex rounded-xl bg-blue-900/20 p-1 fixed bottom-5 w-11/12 max-w-4xl">

          {/* "left-1/2 transform -translate-x-1/2 max-w-xs w-11/12 sm:max-w-md sm:w-full" */}
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-black hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </TabList>
        </TabGroup>

  );
}
