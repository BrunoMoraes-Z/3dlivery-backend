import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Provider from '../../models/Provider';

class ListAllProviders {
  public async execute(): Promise<Provider[]> {
    const providerRepository = getRepository(Provider);

    const providers = await providerRepository.find();

    if (!providers) {
      throw new AppError('Não existe nenhum provedor.', 400);
    }
    
    providers.forEach(function (provider) {
      delete provider.password
    })

    return providers;
  }
}

export default ListAllProviders;
