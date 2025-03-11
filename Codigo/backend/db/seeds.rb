# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_nname|
#     MovieGenre.find_or_create_by!(nname: genre_name)
#   end

grupo1 = Api::Group.create!(
  name: "Segunda",
  time: "13:00",
  max_members: 12,
)
grupo2 = Api::Group.create!(
  name: "Quarta",
  time: "15:00",
  max_members: 11,
)
grupo3 = Api::Group.create!(
  name: "Sexta",
  time: "08:00",
  max_members: 10,
)
grupo4 = Api::Group.create!(
  name: "Terça",
  time: "13:00",
  max_members: 12,
)
grupo5 = Api::Group.create!(
  name: "Quita",
  time: "15:00",
  max_members: 11,
)
grupo6 = Api::Group.create!(
  name: "Sabado",
  time: "08:00",
  max_members: 10,
)


user = Api::User.create!(
  name: "Jeogina Cris Morta",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "111.546.876-77",
  birthday: "2001-02-03T04:05:06+00:00",
  gender: "Homem",
  job: "Modeladora de rostos",
  health_issues: "100% obesa",
  gym_goal: "Emagracer",
)

user.group << grupo1
user.group << grupo2


user = Api::User.create!(
  name: "Marcos Neves Souza",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "145.878.446-70",
  birthday: "1990-02-08T04:05:06+00:00",
  gender: "Homem",
  job: "Asrtonauta",
  health_issues: "",
  gym_goal: "Criar musculo",
  group_id:[1,2,4,5]

)
user.group << grupo1
user.group << grupo2
user.group << grupo4
user.group << grupo5


user = Api::User.create!(
  name: "Kendal Steve jobs",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "115.900.111-16",
  birthday: "2000-01-28T04:05:06+00:00",
  gender: "Homem",
  job: "Desenvolvedor ",
  health_issues: "Ma Nutricao",
  gym_goal: "Musculo",
  group_id:[1,3,4]

)
user.group << grupo1
user.group << grupo3
user.group << grupo4

user = Api::User.create!(
  name: "Carol Souza Marques",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "133.633.780-06",
  birthday: "2001-02-03T04:05:06+00:00",
  gender: "Muher",
  job: "Advogada",
  health_issues: "",
  gym_goal: "Emagracer",
  group_id:[1,2,5]

)

user.group << grupo1
user.group << grupo2
user.group << grupo5


user = Api::User.create!(
  name: "Henriquele Micaela Paulo",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "167.254.099-23",
  birthday: "1997-04-21T04:05:06+00:00",
  gender: "Mulher",
  job: "Treinador de Academia",
  health_issues: "",
  gym_goal: "Musculo",
  group_id:[4,5,6]

)
user.group << grupo4
user.group << grupo5
user.group << grupo6

user = Api::User.create!(
  name: "Cristao Augusto Silva Gomes",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "122.459.903-55",
  birthday: "2005-06-15T04:05:06+00:00",
  gender: "Homem",
  job: "Patinador Artistico",
  health_issues: "Anorexia",
  gym_goal: "Emagrecer",
  group_id:[2,4,6]

)

user.group << grupo2
user.group << grupo4
user.group << grupo6

user = Api::User.create!(
  name: "Julia silva Juliana",
  subscription_fee: 169.99,
  phone_number: "31-90941-4212",
  cpf: "000.145.287-07",
  birthday: "2000-12-03T04:05:06+00:00",
  gender: "Mulher",
  job: "Quimica industral",
  health_issues: "",
  gym_goal: "Emagracer",
  group_id:[1,3,4,6]

)

user.group << grupo1
user.group << grupo3
user.group << grupo4
user.group << grupo6
