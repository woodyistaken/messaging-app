class CreateFriendships < ActiveRecord::Migration[8.0]
  def change
    create_table :friendships do |t|
      t.belongs_to :friender, foreign_key: { to_table: :users }
      t.belongs_to :friended, foreign_key: { to_table: :users }
      t.integer :status
      t.timestamps
    end
  end
end
