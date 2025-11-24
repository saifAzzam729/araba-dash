import React from 'react';
import FemaleIcon from '@src/assets/images/gender-icons/female.png'
import MaleIcon from '@src/assets/images/gender-icons/male.png'
import {Badge} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";


export default function GenderDisplayer({gender}) {
    const {translate} = useLocaleContext()
    if (gender?.toLowerCase() === 'male') {
        return (
            <div className='d-flex flex-row w-100 align-items-center'>
                <Badge className='text-capitalize' color="light-info" pill>
                    <img style={{
                        width: '16px',
                        height: '16px'
                    }}
                         src={MaleIcon}/>
                    <span className='mx-1'>{translate('common.male')}</span>
                </Badge>
            </div>
        )
    } else if (gender?.toLowerCase() === 'female') {
        return (
            <div className='d-flex flex-row w-100 align-items-center'>
                <Badge className='text-capitalize' color="light-danger" pill>
                    <img
                        style={{
                            width: '16px',
                            height: '16px'
                        }}
                        src={FemaleIcon}/>
                    <span className='mx-1'>{translate('common.female')}</span>
                </Badge>
            </div>
        )
    } else {
        return (
            <span>-</span>
        )
    }

}
