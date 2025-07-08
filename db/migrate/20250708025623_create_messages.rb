class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.belongs_to :sender, foreign_key: { to_table: :users }
      t.belongs_to :receiver, foreign_key: { to_table: :users }
      t.text :message
      t.timestamps
    end
  end
end
