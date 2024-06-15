import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  PlayIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/16/solid'
import { ActionOptionFunction } from '../client';

interface OptionsFunctionProps {
  status: string;
  address: string;
  slug: string;
  pathFrom: string;
}

export default function OptionsFunction({ status, address, slug, pathFrom }: OptionsFunctionProps) {
  const getButtonText = (status: string, pathFrom: string) => {
    if (pathFrom === '/purchases' && status === 'taked_offer') {
      return 'Wait for confirmation';
    }
    switch (status) {
      case 'pending':
        return 'Request activation';
      case 'taked_offer':
        return 'See transfer receipt';
      default:
        return 'No actions to take';
    }
  };

  const getIconText = (status: string) => {
    switch (status) {
      case 'pending':
        return <PlayIcon className="size-4 fill-white/30" />;
      case 'taked_offer':
        return <ClipboardDocumentIcon className="size-4 fill-white/30" />;
      default:
        return <CheckIcon className="size-4 fill-white/30" />;
    }
  };

  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white shadow-lg [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <ActionOptionFunction 
                icon={getIconText(status)}
                text={getButtonText(status, pathFrom)}
                slug={slug}
                address={address}
                status={status}
              />
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
