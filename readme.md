yarn sequelize migration:create --name=create-users

yarn sequelize db:migrate

yarn sequelize db:migrate:undo
_Desfaz a ultima modificação do db:migrate_

yarn sequelize db:migrate:undo:all
_Desfaz todas as modificação do db:migrate_
