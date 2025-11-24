# Page Filters Dropdown
### Guide for using the filters code

this file will help you understand and use and copy the filter code.

the directory is composed of 3 main parts:
- _*entity*_FilterAccordion.js file
- partials directory
- hooks directory

## 1: _*entity*_FilterAccordion.js file
> this file is the index of the filter accordion to any table.
> it does the following:
> 1- wraps the form fields in a React Hook Form Provider
> 2- manages the url search params by changing them on submit and on clear.
> 3- it sets the accordion state to be open or closed depending on the url search params
if it has any key of the filters key then the dropdown should be open.


##### Using the component exported by _*entity*_FilterAccordion.js file should be enough to `display the filters and handle the Url Search Params ONLY` and for handling the filter object we use another code that is in `the hooks directory`


### What Pieces to edit?
mainly you have to edit
```
    const defaultValuesEmptyObject = {
        user: '',
        status: '',
    };
```
and
```
    const onSubmit = (data) => {
        const {user, status} = data;
        toggleValueInQueryParam('user', user ? user.value : null);
        toggleValueInQueryParam('status', status ? status.value : null);
    }
```
depending on the page you are filtering.

## 2: partials directory
this directory contains files of `each filter` make sure that each filter has its own file here.
each of these files handles its states which are:
* fetch (only if needed.. for example in case of dropdowns)
* update form field value using React Hook form ``setValue()`` (required)
> note: the logic may vary depending on each filter and what is best for it.

## 3: hooks
#### contains use_*entity*_FilterQueryParamsListener.js File
this file controls the value of the object that is used for filtering since it take a prop (updateParamsObject)
which is a callback for updating that object.


##### Using the hook exported by use_*entity*_FilterQueryParamsListener.js file should manage and change the object of the filter.
