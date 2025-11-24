import LoadingButton from '@mui/lab/LoadingButton';
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function SubmitLoadingBtn({isLoading = false, text = 'submit', ...rest}) {
    const {translate} = useLocaleContext();

    return (
        <LoadingButton
            loading={isLoading}
            size="medium"
            type="submit"
            className="bg-primary rounded mb-3 fw-bold"
            variant="contained"
            {...rest}
            >
            {translate(`common.${text}`)}
        </LoadingButton>
    )
}
