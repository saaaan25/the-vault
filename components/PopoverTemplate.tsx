"use client"

import * as Popover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

interface PopoverTemplateProps {
    trigger: ReactNode
    content: ReactNode
}

const PopoverTemplate: React.FC<PopoverTemplateProps> = ({ trigger, content }) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                {trigger}
            </Popover.Trigger>
            <Popover.Content 
                className="
                    bg-custom-color-2 
                    shadow-md 
                    rounded-md 
                    z-50
                "
                side='left'
                sideOffset={5}
            >
                {content}
            </Popover.Content>
        </Popover.Root>
    );
}

export default PopoverTemplate
