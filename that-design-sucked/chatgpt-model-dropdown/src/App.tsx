import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

interface CSSPropertiesWithCustomVars extends React.CSSProperties {
  '--radix-popper-transform-origin'?: string;
  '--radix-popper-available-width'?: string;
  '--radix-popper-available-height'?: string;
  '--radix-popper-anchor-width'?: string;
  '--radix-popper-anchor-height'?: string;
  '--radix-dropdown-menu-content-transform-origin'?: string;
  '--radix-dropdown-menu-content-available-width'?: string;
  '--radix-dropdown-menu-content-available-height'?: string;
  '--radix-dropdown-menu-trigger-width'?: string;
  '--radix-dropdown-menu-trigger-height'?: string;
}

const RadixMenu: React.FC = () => {
  const [temporaryChat, setTemporaryChat] = React.useState(false);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-sm text-token-text-tertiary">
          Model
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 max-w-xs rounded-2xl popover bg-token-main-surface-primary shadow-lg will-change-[opacity,transform] radix-side-bottom:animate-slideUpAndFade radix-side-left:animate-slideRightAndFade radix-side-right:animate-slideLeftAndFade radix-side-top:animate-slideDownAndFade border border-token-border-light min-w-[340px] overflow-hidden py-0"
          sideOffset={5}
        >
          <div className="max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto min-w-fit py-2">
            <div className="mb-1 flex items-center justify-between px-5 pt-2">
              <span className="text-sm text-token-text-tertiary">Model</span>
              <a
                href="https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4"
                target="_blank"
                rel="noreferrer"
              >
                <QuestionMarkCircledIcon className="h-5 w-5 text-token-text-tertiary" />
              </a>
            </div>

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 !opacity-100"
              data-testid="model-switcher-gpt-4o"
            >
              <div className="flex grow items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      GPT-4o
                      <div className="text-token-text-secondary text-xs">
                        Great for most questions
                      </div>
                    </div>
                  </div>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-md"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM16.0755 7.93219C16.5272 8.25003 16.6356 8.87383 16.3178 9.32549L11.5678 16.0755C11.3931 16.3237 11.1152 16.4792 10.8123 16.4981C10.5093 16.517 10.2142 16.3973 10.0101 16.1727L7.51006 13.4227C7.13855 13.014 7.16867 12.3816 7.57733 12.0101C7.98598 11.6386 8.61843 11.6687 8.98994 12.0773L10.6504 13.9039L14.6822 8.17451C15 7.72284 15.6238 7.61436 16.0755 7.93219Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 pointer-events-none text-token-text-quaternary"
              data-testid="model-switcher-gpt-4o-jawbone"
              disabled
            >
              <div className="flex grow items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>GPT-4o with scheduled tasks</span>
                        <div className="border-token-text-quartenary items-center rounded-full border px-1 py-0.5 text-[8px] font-semibold uppercase leading-3 text-token-text-secondary dark:border-token-border-heavy dark:text-token-text-tertiary">
                          Beta
                        </div>
                      </div>
                      <div className="text-xs">
                        Ask ChatGPT to follow up later
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 pointer-events-none text-token-text-quaternary"
              data-testid="model-switcher-o1"
              disabled
            >
              <div className="flex grow items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      o1
                      <div className="text-xs">Uses advanced reasoning</div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 pointer-events-none text-token-text-quaternary"
              data-testid="model-switcher-o3-mini"
              disabled
            >
              <div className="flex grow items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      o3-mini
                      <div className="text-xs">Fast at advanced reasoning</div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 pointer-events-none text-token-text-quaternary"
              data-testid="model-switcher-o1-pro"
              disabled
            >
              <div className="flex grow items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      o1 pro mode
                      <div className="text-xs">Best at reasoning</div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger
                className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3"
                data-testid="more-models-submenu"
              >
                <div className="flex grow justify-between gap-2 overflow-hidden">
                  More models
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-md rtl:-scale-x-100"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
                    fill="currentColor"
                  />
                </svg>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="min-w-[220px] bg-token-main-surface-primary rounded-md p-1 shadow-lg"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  {/* Add submenu items here */}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className="mx-5 my-1 h-px bg-token-border-light" />

            <DropdownMenu.Item
              className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary py-3 gap-3 !pr-3"
            >
              <div className="flex items-center justify-center text-token-text-secondary h-5 w-7">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9739 3.25193C11.0996 3.78971 10.7656 4.3276 10.2278 4.45333C8.71987 4.80589 7.37959 5.59978 6.35157 6.69357C5.97334 7.09601 5.34048 7.11563 4.93804 6.73739C4.5356 6.35916 4.51598 5.7263 4.89422 5.32386C6.18477 3.95074 7.87069 2.9505 9.77245 2.50585C10.3102 2.38012 10.8481 2.71415 10.9739 3.25193ZM13.0264 3.25196C13.1521 2.71418 13.69 2.38016 14.2278 2.50592C16.1295 2.95059 17.8153 3.95083 19.1058 5.32393C19.4841 5.72637 19.4645 6.35923 19.062 6.73746C18.6596 7.11569 18.0267 7.09607 17.6485 6.69363C16.6205 5.59985 15.2803 4.80597 13.7724 4.45338C13.2346 4.32763 12.9006 3.78974 13.0264 3.25196ZM3.90936 8.51416C4.43816 8.6735 4.73766 9.23135 4.57832 9.76015C4.36501 10.4681 4.25 11.2197 4.25 12C4.25 12.7745 4.36331 13.5303 4.57474 14.2495C4.73051 14.7793 4.42725 15.3351 3.89739 15.4909C3.36753 15.6467 2.81171 15.3434 2.65594 14.8136C2.39202 13.9159 2.25 12.9702 2.25 12C2.25 11.0221 2.39427 10.0761 2.66337 9.18311C2.82271 8.65432 3.38056 8.35481 3.90936 8.51416ZM20.0907 8.51424C20.6195 8.3549 21.1773 8.65441 21.3367 9.18321C21.6057 10.0762 21.75 11.0222 21.75 12C21.75 12.9702 21.608 13.9158 21.3441 14.8135C21.1883 15.3433 20.6325 15.6466 20.1026 15.4908C19.5728 15.3351 19.2695 14.7793 19.4253 14.2494C19.6367 13.5303 19.75 12.7745 19.75 12C19.75 11.2197 19.635 10.4681 19.4217 9.76022C19.2624 9.23142 19.5619 8.67357 20.0907 8.51424ZM19.1091 17.2823C19.5227 17.6483 19.5613 18.2803 19.1953 18.6939C17.9017 20.1558 16.1885 21.2454 14.2402 21.7273C13.7041 21.86 13.162 21.5328 13.0294 20.9967C12.8968 20.4606 13.2239 19.9185 13.76 19.7859C15.2896 19.4075 16.6553 18.5463 17.6975 17.3685C18.0635 16.9549 18.6955 16.9163 19.1091 17.2823Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex grow items-center justify-between gap-2">
                <div className="flex flex-1 items-center gap-3">Temporary chat</div>
                <DropdownMenu.CheckboxItem
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-secondary focus-visible:ring-offset-2 focus-visible:radix-state-checked:ring-black focus-visible:dark:ring-token-main-surface-primary focus-visible:dark:radix-state-checked:ring-green-600 cursor-pointer bg-gray-200 radix-state-checked:bg-black dark:border dark:border-token-border-medium dark:bg-transparent relative shrink-0 rounded-full dark:radix-state-checked:border-green-600 dark:radix-state-checked:bg-green-600 h-[20px] w-[32px]"
                  checked={temporaryChat}
                  onCheckedChange={setTemporaryChat}
                >
                  <span
                    className="flex items-center justify-center rounded-full transition-transform duration-100 will-change-transform ltr:translate-x-0.5 rtl:-translate-x-0.5 bg-white h-[16px] w-[16px] ltr:radix-state-checked:translate-x-[14px] rtl:radix-state-checked:translate-x-[-14px]"
                  />
                </DropdownMenu.CheckboxItem>
              </div>
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default RadixMenu;
