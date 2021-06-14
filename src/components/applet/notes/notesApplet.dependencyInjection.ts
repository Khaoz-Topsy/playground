
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { BlogRssService } from '../../../services/BlogRssService';
import { DataService } from '../../../services/DataService';

export interface IExpectedServices {
    dataService: DataService;
    blogRssService: BlogRssService
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        dataService: services.dataService,
        blogRssService: services.blogRssService,
    }
};