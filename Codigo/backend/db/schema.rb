# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_25_010641) do
  create_table "clients", force: :cascade do |t|
    t.string "name", null: false
    t.float "subscription_fee", null: false
    t.string "cpf", null: false
    t.float "hours_left"
    t.string "phone_number"
    t.date "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "group_id"
    t.datetime "birthday"
    t.integer "gender"
    t.string "job"
    t.string "health_issues"
    t.string "gym_goal"
  end

  create_table "clients_groups", id: false, force: :cascade do |t|
    t.integer "client_id", null: false
    t.integer "group_id", null: false
    t.index ["client_id"], name: "index_clients_groups_on_client_id"
    t.index ["group_id"], name: "index_clients_groups_on_group_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.float "salary"
    t.string "cpf"
    t.string "phone_number"
    t.string "address"
    t.float "total_hours_worked"
    t.date "birth_date"
    t.string "position"
    t.time "begin_shift"
    t.time "end_shift"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employees_groups", id: false, force: :cascade do |t|
    t.integer "employee_id", null: false
    t.integer "group_id", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.datetime "deleted_at"
    t.integer "max_members"
    t.string "time"
    t.integer "week_day"
    t.string "instructor"
    t.integer "status"
  end

  create_table "groups_clients", id: false, force: :cascade do |t|
    t.integer "client_id", null: false
    t.integer "group_id", null: false
  end

  create_table "historico_pagamentos", force: :cascade do |t|
    t.integer "client_id"
    t.float "price"
    t.date "expiration_date"
    t.integer "status"
    t.date "day_paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pagamentos", force: :cascade do |t|
    t.integer "client_id"
    t.float "price"
    t.date "expiration_date"
    t.integer "status"
    t.date "day_paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "client_id"
    t.float "price"
    t.date "expiration_date"
    t.integer "status"
    t.date "day_paid"
  end

  create_table "user_times", force: :cascade do |t|
    t.time "time"
    t.string "week_day"
    t.boolean "reserved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wait_lists", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "client_id"
    t.integer "group_id"
  end

  add_foreign_key "clients", "groups"
end
