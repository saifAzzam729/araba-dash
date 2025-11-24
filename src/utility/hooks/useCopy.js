import {useCallback, useState} from "react";

export default function useCopy(value, timeout = 1500) {

    const [isCopied, setIsCopied] = useState(false);

    const onCopyClicked = useCallback(() => {
        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false)
            }, timeout);
        });

    }, [timeout, value]);

    return {
        isCopied,
        onCopyClicked,
    }

}
