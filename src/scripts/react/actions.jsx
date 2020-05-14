//== constants - string ==========================================
export const Ks = {
	ASSIGN_VALUE: 'ASSIGN_VALUE',
	SET_BLOCKING: 'SET_BLOCKING',
	ASSIGN_FORM_DATA_HEADER: 'ASSIGN_FORM_DATA_HEADER',
	ASSIGN_FORM_DATA_MAIN: 'ASSIGN_FORM_DATA_MAIN',
	ASSIGN_FORM_DATA_FOOTER: 'ASSIGN_FORM_DATA_FOOTER',
}

//== actions =====================================================
export default {
	assignValue: (name, value, targetReducer) => ({
		type: Ks.ASSIGN_VALUE,
		name: name,
		value: value,
		targetReducer: targetReducer
	}),
	setBlocking: (flag) => ({
		type: Ks.SET_BLOCKING,
		flag: flag
	}),
	assignFormDataHeader: (formData) => ({
		type: Ks.ASSIGN_FORM_DATA_HEADER,
		formHeader: formData.formHeader
	}),
	assignFormDataMain: (formData) => ({
		type: Ks.ASSIGN_FORM_DATA_MAIN,
		formMain: formData.formMain
	}),
	assignFormDataFooter: (formData) => ({
		type: Ks.ASSIGN_FORM_DATA_FOOTER,
		formFooter: formData.formFooter
	})
}