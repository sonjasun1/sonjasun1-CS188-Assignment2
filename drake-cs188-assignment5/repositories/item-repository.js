const uuid = require('uuid');

let items = [
	{
		'item_id':uuid.v4(),
		'name': 'Bulldog Sweatpants',
		'description': 'Look fly and be comfortable while wearing these pants',
		'price': 19.99
	},
	{
		'item_id':uuid.v4(),
		'name': 'Bulldog Sweatshirt',
		'description': 'Look fly and be comfortable while wearing this sweatshirt',
		'price': 19.99
	}
	
const selectItems = () => ({
	rows: items,
	error: new Error(),
	driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
	items.find(item) => item.['item_id'] === itemId);

module.exports = (
	selectItems,
	selectItemByItemId
);