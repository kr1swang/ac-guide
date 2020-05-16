var doGet = (e) => {
    // declare variable
    let acGuideSheetURL = 'https://docs.google.com/spreadsheets/d/1YzjMlPvnycCMN0CVDGu4xNlAUtx1M0K6wIMdwS0J0zA'
    let result = []
    let params = e.parameter
    let type = params.type

    switch (type) {
        case 'fish': {
            result = getFishGuide(acGuideSheetURL)
            break
        }
        case 'bug': {
            result = getBugGuide(acGuideSheetURL)
            break
        }
        default: {
            break
        }
    }

    // return data as JSON
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
}

var getFishGuide = (url) => {
    // declare variable
    let result = []

    // get target sheet
    let sheetID = url.split('/').pop()
    let spreadSheet = SpreadsheetApp.openById(sheetID)
    let sheet = spreadSheet.getSheets()[0]

    // get all data as array, and without header
    let listAll = sheet.getSheetValues(2, 1, sheet.getLastRow() - 1, 9)

    // rebuild data to result
    listAll.forEach(function (itm, idx) {
        result.push({
            index: idx,
            imageURL: itm[0],
            chineseName: itm[1],
            englishName: itm[2],
            price: itm[3],
            location: itm[4],
            shadowSize: itm[5],
            northernMonths: JSON.parse(itm[6] || '[]'),
            //southernMonths = northernMonths + 6 months, then sort
            southernMonths: JSON.parse(itm[6] || '[]').map(x => (x + 6) % 12 == 0 ? 12 : (x + 6) % 12).sort((a, b) => a - b),
            appearanceTime: JSON.parse(itm[7] || '[]'),
            remark: itm[8]
        })
    })

    return result
}

var getBugGuide = (url) => {
    // declare variable
    let result = []

    // get target sheet
    let sheetID = url.split('/').pop()
    let spreadSheet = SpreadsheetApp.openById(sheetID)
    let sheet = spreadSheet.getSheets()[1]

    // get all data as array, and without header
    let listAll = sheet.getSheetValues(2, 1, sheet.getLastRow() - 1, 8)

    // rebuild data to result
    listAll.forEach(function (itm, idx) {
        result.push({
            index: idx,
            imageURL: itm[0],
            chineseName: itm[1],
            englishName: itm[2],
            price: itm[3],
            location: itm[4],
            northernMonths: JSON.parse(itm[5] || '[]'),
            //southernMonths = northernMonths + 6 months, then sort
            southernMonths: JSON.parse(itm[5] || '[]').map(x => (x + 6) % 12 == 0 ? 12 : (x + 6) % 12).sort((a, b) => a - b),
            appearanceTime: JSON.parse(itm[6] || '[]'),
            remark: itm[7]
        })
    })

    return result
}