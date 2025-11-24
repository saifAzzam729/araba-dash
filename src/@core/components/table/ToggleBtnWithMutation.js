import {Input} from "reactstrap";

const ToggleBtnWithMutation = ({item, booleanKey = 'publish', mutation, isLoading = false}) => {
    return (
        <div className='d-flex flex-column cursor-pointer'>
            <div className='form-switch form-check-primary cursor-pointer'>
                <Input
                    type='switch'
                    id='switch-primary'
                    name='primary'
                    checked={item[booleanKey]}
                    className="cursor-pointer"
                    onChange={(e) => {
                        const toMutateItem = {...item};
                        toMutateItem[booleanKey] = e.target.checked
                        mutation(toMutateItem)
                    }}
                />
            </div>
        </div>
    )
}

export default ToggleBtnWithMutation;
