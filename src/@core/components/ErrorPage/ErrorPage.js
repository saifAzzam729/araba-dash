import React from 'react'
import SomethingWentWrong from '../../../views/SomethingWentWrong'
import BreadCrumbs from '../breadcrumbs'

function ErrorPage({title, breadCrumbSubPagesData = []}) {
    return (
        <>
            <BreadCrumbs title={title} data={breadCrumbSubPagesData}/>
            <SomethingWentWrong/>
        </>
    )
}

export default ErrorPage