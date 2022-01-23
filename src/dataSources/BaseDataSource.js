/* eslint-disable class-methods-use-this */
/**
 * A base construct for detailing data sources
 */
class BaseDataSource {
  async authenticate() {
    throw Error('Subclasses must specify an authentication method');
  }
}

export default BaseDataSource;
/* eslint-enable class-methods-use-this */
