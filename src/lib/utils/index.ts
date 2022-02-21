export function add(acc, n) {
	return acc + n;
}

export function exportToJsonFile(jsonData: any, name: string = 'data.json') {
	let dataStr = JSON.stringify(jsonData);
	let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

	let exportFileDefaultName = name;

	let linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
}

export function round(n: number, precision: number) {
	return Math.round((n + Number.EPSILON) * Math.pow(10, precision)) / Math.pow(10, precision);
}
