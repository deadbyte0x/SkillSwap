import { useEffect, RefObject } from "react";

export function useClickOutside (
    ref: RefObject<HTMLElement>[],
    onClickOutside: () => void,
    enabled: boolean = true,
) {
    useEffect(() => {
        if (!enabled) return

        const handleClick = (event: MouseEvent) => {
          const target = event.target as Node
          const isInside = ref.some((r) => r.current && r.current.contains(target));
            if (!isInside) {
                onClickOutside()
            }
        }

        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [ref, onClickOutside, enabled])
}
