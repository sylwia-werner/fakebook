import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import $ from './LoadingView.module.scss';

export const LoadingView = () => {
    return (
        <div className={$.wrapper}>
            <LoadingSpinner />
        </div>
    );
};
