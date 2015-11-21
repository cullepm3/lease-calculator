class CreateLeases < ActiveRecord::Migration
  def change
    create_table :leases do |t|
      t.json :terms
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
