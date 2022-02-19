export function add(acc, n) {
	return acc + n;
}

export function exportToJsonFile(jsonData) {
	let dataStr = JSON.stringify(jsonData);
	let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

	let exportFileDefaultName = 'data.json';

	let linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
}
