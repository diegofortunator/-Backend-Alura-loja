import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'O nome da característica não pode ser vazio.' })
  nome: string;

  @MaxLength(1000, {
    message:
      'A descrição da característica pode ter no máximo 1000 caracteres.',
  })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsNotEmpty({ message: 'A URL da imagem não pode ser vazia.' })
  url: string;

  @MaxLength(1000, {
    message: 'A descrição da imagem pode ter no máximo 1000 caracteres.',
  })
  descricao: string;
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsNotEmpty({ message: 'O nome deve ser preenchido' })
  @IsString({ message: 'O nome não pode ser número.' })
  nome: string;

  @IsPositive({ message: 'O valor deve ser positivo.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'São permitidos no máximo 2 casas decimais no valor.' },
  )
  valor: number;

  @IsPositive({ message: 'A quantidade deve ser positiva.' })
  quantidade: number;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
  @MaxLength(1000, {
    message: 'A descrição pode ter no máximo 1000 caracteres.',
  })
  descricao: string;

  @ValidateNested()
  @ArrayMinSize(3, {
    message:
      'A lista de características do produto precisa ter pelo menos 3 itens.',
  })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ArrayMinSize(1, { message: 'Deve haver ao menos uma imagem cadastrada.' })
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria deve ser preenchida.' })
  categoria: string;

  @IsISO8601(
    {},
    { message: 'O campo data de criação deve conter uma data valida.' },
  )
  dataCriacao: string;

  @IsISO8601(
    {},
    { message: 'O campo data de atualização deve conter uma data valida.' },
  )
  dataAtualizacao: Date;
}
