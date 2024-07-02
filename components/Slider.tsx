"use client"

import * as RadixSlider from "@radix-ui/react-slider"

interface SliderProps {
    value?: number
    onChange?: (value: number) => void
    max?: number 
    step?: number 
    ariaLabel: string 
    showThumb?: boolean
}

const Slider: React.FC<SliderProps> = ({
    value = 1,
    onChange,
    max = 1, 
    step = 0.1,
    ariaLabel,
    showThumb = true
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }

    return (
        <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={step}
            aria-label={ariaLabel}
        >
            <RadixSlider.Track
                className="bg-custom-color-4 relative grow rounded-full h-[3px]"
            >
                <RadixSlider.Range 
                    className="absolute bg-black rounded-full h-full"
                />
            </RadixSlider.Track>
            {showThumb && (
                <RadixSlider.Thumb className="block w-3 h-3 bg-black rounded-full" />
            )}
        </RadixSlider.Root>
    )
}

export default Slider
