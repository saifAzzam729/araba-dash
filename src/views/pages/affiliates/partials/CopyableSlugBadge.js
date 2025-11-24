import {Badge} from "reactstrap";
import {Check} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useState} from "react";
import useCopy from "@hooks/useCopy";

function CopyableSlugBadge({slug}) {
    const {translate} = useLocaleContext();
    let websiteLink = import.meta.env.VITE_WEBSITE_BASE_URL

    const STRING_TO_COPY = `${websiteLink}/${slug}`;

    const {isCopied, onCopyClicked} = useCopy(STRING_TO_COPY);

    return (<div>
        {isCopied && <Badge className={'position-absolute'}
                            style={{top: "25%", right: "-5px", paddingTop: '6px', lineHeight: '1.1'}}
                            color='light-warning'
                            pill>
            <Check size={12} className='align-middle me-25'/>
            <span className='align-middle'>{translate('common.copied')}</span>
        </Badge>}
        <Badge color='light-success cursor-pointer' onClick={onCopyClicked}>{slug}</Badge>
    </div>)
}

export default CopyableSlugBadge
