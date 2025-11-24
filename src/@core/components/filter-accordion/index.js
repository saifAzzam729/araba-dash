import {Grid, Stack} from '@mui/material'
import React, {useEffect, useState} from 'react'

// ** Reactstrap Imports
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap'
import SubmitLoadingBtn from '../form-ui/SubmitLoadingBtn'
import './style.css';
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Edit, X} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";

const FilterAccordion = ({
                             onClear, isOpen, children
                         }) => {

    const {translate, isRtl} = useLocaleContext();

    const [open, setOpen] = useState('0')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }


    const clearHandler = (e) => {
        e.preventDefault();
        onClear();
    }

    useEffect(() => {
        setOpen(isOpen ? '1' : '0')
    }, [isOpen]);


    return (<Accordion open={open} toggle={toggle}>
        <AccordionItem>
            <AccordionHeader targetId='1'>{translate('common.filters')}</AccordionHeader>
            <AccordionBody accordionId='1' className={"mb-2 pb-0"}>
                {children}

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap="10px"
                    className={"pt-3 pb-0 mb-0"}
                >
                    <LoadingButton
                        size="medium"
                        type="button"
                        className={`text-warning border-warning rounded fw-bold gap-${isRtl ? 1 : 0}`}
                        startIcon={<X size={14}/>}
                        loadingPosition="start"
                        variant="outlined"
                        sx={{padding: '7px 15px;'}}
                        onClick={clearHandler}
                    >
                        {translate('common.filter-clear-button')}
                    </LoadingButton>

                    <LoadingButton
                        size="medium"
                        type="submit"
                        className={`text-primary border-primary rounded fw-bold gap-${isRtl ? 1 : 0}`}
                        startIcon={<Edit size={14}/>}
                        loadingPosition="start"
                        variant="outlined"
                        sx={{padding: '7px 15px;'}}
                    >
                        {translate('common.filter-apply-button')}
                    </LoadingButton>
                </Stack>
            </AccordionBody>
        </AccordionItem>
    </Accordion>)
}

export default FilterAccordion;
