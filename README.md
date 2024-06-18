# Sistema caixa seguro

## Domínios

- Manutenção vendas
- - Gestão de pré-vendas
- - Gestão de métodos de pagamento
- Manutenção de caixa
- Manutenção do estoque
- Manutenção de clientes

## Requisitos funcionais

- Limitações de permissão por usuário autenticado
- Manutenção vendas
- - Conseguir fazer vendas apontando como vendedor um usuário não autenticado
- - Ao vender, fazer a remoção do produto vendido na quantidade que foi retirada do estoque.
- - Selecionar um cliente e gravar o histórico da venda para o cliente.
- - Buscar produtos pelo código ou código de barras
- - Buscar produtos pelo nome, fabricante, categoria.
- - Buscar produtos por características.
- - Listar produtos e suas características e seus devidos estoques.
- - Poder selecionar as características do produto a ser vendido.
- - Poder calcular o desconto por porcentagem ou valor.
- - Poder salvar a venda como pré-venda em vez de finalizar.
- - Poder acessar pré-vendas e visualizar a lista
- - Poder associar uma pré-venda a um cliente
- - Organizar pré-vendas por código e data de criação.
- - Poder buscar pré-venda por código e data de criação.
- - Poder imprimir uma pré-venda com o código da mesma.
- - Ao apresentar o produto na busca, caso exista uma pré-venda para o produto e for o ultimo no estoque, apresentar uma notificação.
- - Poder selecionar mais de um método de pagamento na finalização da venda.
- - Poder parcelar a venda para um cliente pré-liberado caso o mesmo tenha limite.
- - Ao finalizar a venda, imprimir um resumo da mesma com o código da venda e os métodos de pagamento.
- Manutenção do estoque
- - Poder cadastrar características da categoria e indicar no produto.
- - Poder adicionar quantidade no estoque de um produto já existente.
- - Conseguir identificar quais produtos possuem pré-vendas.

## Fluxos

### Autenticação

- Autenticar com CPF e senha
- Recuperação de senha
- - Utilizar e-mail para a recuperação, preenchendo um código de validação
- Primeiro acesso
- - Criação da primeira senha
- Selecionar qual empresa o usuário vai querer interagir
- - Caso o usuário já tenha entrado no sistema anteriormente, autenticar com a ultima empresa logada

##Emissão de NF-e e NFC-e
A comunicação é feita através de SOAP
