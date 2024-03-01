import { format } from 'date-fns';

function formatDate(isoString) {
    const date = new Date(isoString);
    return format(date, 'dd/MM/yyyy');
}

export default formatDate;