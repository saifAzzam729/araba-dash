import React, {useEffect, useState} from 'react'

// ** Reactstrap Imports
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap'
import '@components/filter-accordion/style.css';
import {useLocaleContext} from "@src/providers/LocaleProvider";

const AccordionWrapper = ({
                              isOpen, children, header
                          }) => {

    const {translate} = useLocaleContext();

    const [open, setOpen] = useState('0')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }


    useEffect(() => {
        setOpen(isOpen ? '1' : '0')
    }, [isOpen]);


    return (<Accordion open={open} toggle={toggle}>
        <AccordionItem>
            <AccordionHeader targetId='1'>{translate(header)}</AccordionHeader>
            <AccordionBody accordionId='1' className={"mb-2 pb-0"}>
                {children}
            </AccordionBody>
        </AccordionItem>
    </Accordion>)
}

export default AccordionWrapper;
