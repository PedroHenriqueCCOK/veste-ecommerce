# VESTE — E-commerce de Moda Acessível

A **VESTE** é um projeto de e-commerce de roupas convencionais e adaptadas, desenvolvido com foco em acessibilidade digital, autonomia e inclusão de pessoas cegas e com baixa visão.

O objetivo é oferecer uma experiência de compra mais acessível, permitindo que os usuários naveguem pelo catálogo, conheçam os produtos, selecionem opções e simulem uma compra com o auxílio de tecnologias assistivas.

## Objetivos do projeto

- Promover maior autonomia durante as compras on-line.
- Facilitar o acesso às informações dos produtos.
- Oferecer navegação por teclado e compatibilidade com leitores de tela.
- Disponibilizar recursos de personalização visual para pessoas com baixa visão.
- Demonstrar como a acessibilidade pode ser incorporada ao desenvolvimento de um e-commerce.

## Funcionalidades

- Catálogo de roupas convencionais e adaptadas.
- Busca e filtros de produtos.
- Visualização de detalhes, preços e descrições.
- Carrinho de compras com gerenciamento de quantidades.
- Checkout demonstrativo.
- Recursos de leitura por voz, quando compatíveis com o navegador.
- Opções de personalização visual, como tamanho do texto, contraste e redução de movimento.
- Elementos de navegação e formulários projetados para facilitar o uso com tecnologias assistivas.

## Acessibilidade

A acessibilidade é um dos princípios centrais da VESTE. O projeto busca incorporar boas práticas de desenvolvimento inclusivo, incluindo:

- HTML semântico e nomes acessíveis para controles.
- Navegação por teclado e indicadores de foco.
- Textos alternativos para imagens relevantes.
- Identificação de campos e mensagens de erro em formulários.
- Comunicação acessível de atualizações importantes da interface.
- Ajustes visuais para favorecer a leitura e a percepção dos elementos.

A implementação deve ser validada com leitores de tela, navegação por teclado e ferramentas de avaliação de acessibilidade. A presença desses recursos não representa, por si só, uma certificação de conformidade com as diretrizes WCAG.

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- APIs nativas do navegador para recursos de voz, quando disponíveis
- LocalStorage para persistência local de informações, como o carrinho

## Como executar

### Pré-requisitos

- Node.js
- npm

### Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd veste
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Escopo da versão 1

A V1 é um protótipo funcional voltado à demonstração da experiência de compra acessível. O checkout é demonstrativo e não representa uma transação financeira real. A aplicação não deve ser considerada um e-commerce pronto para produção sem a implementação e validação dos serviços necessários.

## Próximas melhorias

- Testes com usuários cegos e com baixa visão.
- Validação manual com leitores de tela.
- Auditoria de acessibilidade baseada na WCAG 2.2 AA.
- Integração com backend, estoque e gerenciamento de pedidos.
- Implementação de pagamentos seguros.
- Aprimoramento das descrições acessíveis dos produtos.

## Propósito

A VESTE busca demonstrar que acessibilidade não deve ser um recurso adicional, mas parte fundamental da experiência digital, contribuindo para uma compra on-line mais inclusiva, compreensível e independente.
