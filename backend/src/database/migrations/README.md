# Documentação sobre as migrations do banco de dados, utilizando o Sequelize como ORM

- [Migration: Create Users](#create-users)
- [Migration: Create Courses](create-courses)
- [Migration: Create Modules](#create-modules)
- [Migration: Create UserCourses](#create-usercourses)
- [Migration: Create LessonPdfs](#create-lessonpdfs)
- [Migration: Create WatchedLessons](#create-watchedlessons)
- [Migration: Create ModulesProgress](#create-modulesprogress)

## Create Users

Esta migração é responsável por criar a tabela `Users` no banco de dados. A tabela é projetada para armazenar informações dos usuários da aplicação.

### Estrutura da Tabela

A tabela `Users` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `name`: String, não nula, armazena o nome do usuário.
- `email`: String, não nula e única, armazena o email do usuário.
- `password`: String, não nula, armazena a senha do usuário.
- `role`: String, não nula, com valor padrão 'STUDENT', define o papel do usuário na aplicação.
- `confirmEmailToken`: String, nula, armazena o token para confirmação do email.
- `country`: String, não nula, armazena o país do usuário.
- `organization`: String, não nula, com valor padrão vazio, armazena a organização do usuário.

## Create Courses

Esta migração é responsável por criar a tabela `Courses` no banco de dados. A tabela é projetada para armazenar informações dos cursos oferecidos pela aplicação.

### Estrutura da Tabela

A tabela `Courses` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `title`: String, não nula, armazena o título do curso.
- `forum`: String, não nula, com valor padrão vazio, armazena o link do fórum do curso.

## Create Modules

Esta migração é responsável por criar a tabela `Modules` no banco de dados. A tabela é projetada para armazenar informações dos módulos dos cursos oferecidos pela aplicação.

### Estrutura da Tabela

A tabela `Modules` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `courseId`: Inteiro, não nulo, estabelece uma chave estrangeira para a tabela `Courses`, indicando a qual curso o módulo pertence.
- `title`: String, não nula e única, armazena o título do módulo.

### Relacionamentos

- `courseId` referencia `id` na tabela `Courses`, estabelecendo um relacionamento de muitos para um. Isso significa que um curso pode ter vários módulos, mas um módulo pertence a apenas um curso. A exclusão ou atualização de um curso resultará na exclusão ou atualização em cascata de seus módulos relacionados.

## Create Lessons

Esta migração é responsável por criar a tabela `Lessons` no banco de dados. A tabela é projetada para armazenar informações das lições dos módulos dos cursos oferecidos pela aplicação.

### Estrutura da Tabela

A tabela `Lessons` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `moduleId`: Inteiro, não nulo, estabelece uma chave estrangeira para a tabela `Modules`, indicando a qual módulo a lição pertence.
- `title`: String, não nula, armazena o título da lição.
- `content`: Texto, não nulo, armazena o conteúdo da lição.
- `image`: String, nula, armazena o caminho para uma imagem relacionada à lição.
- `link`: String, nula, armazena o link para um vídeo relacionado à lição.

### Relacionamentos

- `moduleId` referencia `id` na tabela `Modules`, estabelecendo um relacionamento de muitos para um. Isso significa que um módulo pode ter várias lições, mas uma lição pertence a apenas um módulo. A exclusão ou atualização de um módulo resultará na exclusão ou atualização em cascata de suas lições relacionadas.

##Create UserCourses

Esta migração é responsável por criar a tabela `UserCourses` no banco de dados. A tabela é projetada para armazenar informações sobre os cursos que os usuários estão inscritos, incluindo o progresso e se o curso foi marcado como favorito.

### Estrutura da Tabela

A tabela `UserCourses` consiste nas seguintes colunas:

- `userId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Users`. Indica o usuário inscrito no curso.
- `courseTitle`: String, não nula, armazena o título do curso.
- `courseId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Courses`. Indica o curso ao qual o usuário está inscrito.
- `progress`: Inteiro, não nulo, com valor padrão 0, indica o progresso do usuário no curso.
- `bookmarked`: Booleano, não nulo, com valor padrão false, indica se o usuário marcou o curso como favorito.

### Relacionamentos

- `userId` estabelece um relacionamento de muitos para um com a tabela `Users`, indicando que um usuário pode estar inscrito em vários cursos.
- `courseId` estabelece um relacionamento de muitos para um com a tabela `Courses`, indicando que um curso pode ter vários usuários inscritos.

## Create LessonPdfs

Esta migração é responsável por criar a tabela `LessonPdfs` no banco de dados. A tabela é projetada para armazenar informações sobre os arquivos PDF associados às lições dos cursos oferecidos pela aplicação.

### Estrutura da Tabela

A tabela `LessonPdfs` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `lessonId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Lessons`. Indica a lição à qual o PDF está associado.
- `path`: String, não nula, armazena o link do PDF.
- `title`: String, não nula, armazena o título do arquivo PDF.

### Relacionamentos

- `lessonId` estabelece um relacionamento de muitos para um com a tabela `Lessons`, indicando que uma lição pode ter vários arquivos PDF associados, mas um arquivo PDF pertence a apenas uma lição. A exclusão de uma lição resultará na exclusão em cascata de seus PDFs relacionados.

## Create WatchedLessons

Esta migração é responsável por criar a tabela `WatchedLessons` no banco de dados. A tabela é projetada para armazenar informações sobre as lições assistidas pelos usuários, permitindo o rastreamento do progresso nos cursos.

### Estrutura da Tabela

A tabela `WatchedLessons` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `lessonId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Lessons`. Indica a lição que foi assistida.
- `userId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Users`. Indica o usuário que assistiu à lição.
- `moduleId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Modules`. Indica o módulo ao qual a lição assistida pertence.
- `watched`: Booleano, não nulo, com valor padrão false. Indica se a lição foi completamente assistida pelo usuário.

### Relacionamentos

- `lessonId`, `userId`, e `moduleId` estabelecem relacionamentos de muitos para um com suas respectivas tabelas (`Lessons`, `Users`, `Modules`), indicando que uma lição pode ser assistida por vários usuários e pertence a um módulo específico. A exclusão de uma lição, usuário ou módulo resultará na exclusão em cascata das entradas relacionadas em `WatchedLessons`.

## Create ModulesProgress

Esta migração é responsável por criar a tabela `ModulesProgress` no banco de dados. A tabela é projetada para armazenar informações sobre o progresso dos usuários nos módulos dos cursos oferecidos pela aplicação.

### Estrutura da Tabela

A tabela `ModulesProgress` consiste nas seguintes colunas:

- `id`: Chave primária, inteiro, autoincrementável e não nula.
- `userId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Users`. Indica o usuário cujo progresso está sendo rastreado.
- `moduleId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Modules`. Indica o módulo ao qual o progresso está associado.
- `courseId`: Chave estrangeira, inteiro, não nula, referencia `id` na tabela `Courses`. Indica o curso ao qual o módulo pertence.
- `progress`: Inteiro, não nulo, com valor padrão 0. Indica o progresso do usuário no módulo, geralmente representado como uma porcentagem.

### Relacionamentos

- `userId`, `moduleId`, e `courseId` estabelecem relacionamentos de muitos para um com suas respectivas tabelas (`Users`, `Modules`, `Courses`), indicando que um usuário pode ter progresso em vários módulos, que por sua vez pertencem a cursos específicos. A exclusão de um usuário, módulo ou curso resultará na exclusão em cascata das entradas relacionadas em `ModulesProgress`.
