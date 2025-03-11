module Api
  class EmployeesController < ApplicationController
    before_action :set_employee, only: %i[ show update destroy ]

    # POST employee
    def create
      begin
        employee = Employee.new(employee_params)
        if employee.save!
          render(json: employee)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ all employee
    def index
      begin
        employee = Employee.all
        render(json: employee)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def index_employee_group
      begin
        employee = @group.employee
        render(json: employee)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def add_employee_to_group
      begin
        group = Group.where(id: params[:group_id])
        @employee.groups << group
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ one employee
    def show
      begin
        render(json: @employee)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # UPDATE employee
    def update
      begin
        @employee.update!(employee_params)
        if @employee.save!
          render(json: @employee)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # DELETE employee
    def destroy
      begin
        @employee.destroy
        render(json: { message: 'Employee deleted successfully' })
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    private

    def set_employee
      @employee = Employee.find(params[:id])
    end

    def set_group
      @group = Group.find(params[:group_id])
    end

    def employee_params
      params.permit(:name, :salary, :cpf, :phone_number, :address, :birth_date, :position, :begin_shift, :end_shift)
    end
  end
end