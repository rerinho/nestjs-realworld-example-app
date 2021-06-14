export interface IHash {
  /**
   * @description Gera uma hash
   * @param data - Dado a ser criptografado
   */
  generate(data: string): string;

  /**
   * @description Verifica se uma string corresponde a uma hash
   * @param data - Dado a ser comparado
   * @param encrypted - Hash a ser comparada
   */
  compare(data: string, encrypted: string): boolean;
}
