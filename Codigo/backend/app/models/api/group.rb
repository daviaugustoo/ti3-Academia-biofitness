module Api
  class Group < ApplicationRecord
    has_and_belongs_to_many :clients
    has_and_belongs_to_many :employees

    enum week_day: {segunda: 1, terça: 2, quarta: 3, quinta: 4, sexta: 5, sabado: 6, domingo: 7}

    validate :max_members_filled

    def max_members_filled
      if clients.size >= max_members
        errors.add(:max_members, "Limite de membros alcançados")
      end
    end
  end
end
