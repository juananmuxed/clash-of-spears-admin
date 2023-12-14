import { Option } from "src/models/api/Options";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'options'

export class OptionsApi {
  async getOptions() {
    return clientApi.getListClient<Option>(controller, '');
  }

  async createOption(option: Option) {
    return clientApi.postClient<Option>(controller, '', option);
  }

  async updateOption(option: Option) {
    return clientApi.putClient<Option>(controller, '', option);
  }

  async deleteOption(option: Option) {
    return clientApi.deleteClient<Option>(controller, '', option);
  }

  async getOptionsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Option, Pagination>(controller, 'admin', pagination)
  }

  async postOptionsBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
