import * as labelsServices from '../services/labels.services';

export const getLabelsAll = async (req, res, next) => {
	try {
		const labelsAll = await labelsServices.getLabelsAll();
		if (labelsAll) {
			return res.status(labelsAll.status).json(labelsAll);
		}
	} catch (error) {
		next(error);
	}
};

export const getLabelsOne = async (req, res, next) => {
	try {
		//const { id } = req.params;
        const params = req.query;
		const labelsItem = await labelsServices.getLabelsOne(params);
		if (labelsItem) {
			return res.status(labelsItem.status).json(labelsItem);
		}
	} catch (error) {
		next(error);
	}
};


// **** POST Controllers ****
// Add one etiqueta in cat_etiquetas collection
export const addLabelsOne = async( req, res, next) => {
    try {
        const addedLabel = await labelsServices.addLabelOne(req.body);
        if(addedLabel){
            return res.status(addedLabel.status).json(addedLabel);
        }
    } catch (error){
        next(error);
    }
}

// **** PUT Controllers ****
// Modify one etiqueta from cat_etiquetas collection
export const updateLabelsOne = async (req, res, next) => {
    try {
        const params = req.query;
        const updateLabelBody = req.body; 
        const updatedLabel = await labelsServices.updateLabelOne(params, updateLabelBody);
        if (updatedLabel) {
            return res.status(updatedLabel.status).json(updatedLabel);
        }
    } catch (error) {
        next(error);
    }
};


// **** PATCH Controllers ****
// Modify one etiqueta from cat_etiquetas collection
export const PatchOneLabel = async (req, res, next) => {
    try {
        const params = req.query;
        const updateLabelBody = req.body; 
        const updatedLabel = await labelsServices.PatchOneLabel(params, updateLabelBody);
        if (updatedLabel) {
            return res.status(updatedLabel.status).json(updatedLabel);
        }
    } catch (error) {
        next(error);
    }
}



// **** DELETE Controllers ****
// Delete one etiqueta from cat_etiquetas collection by ID
export const deleteLabelsOne = async(req,res,next) => {
    try{
        const params = req.query;
        //const {id} = req.params;
        const EtiquetDeleted = await labelsServices.deleteLabelOne(params);
        if(EtiquetDeleted){
            return res.status(EtiquetDeleted.status).json(EtiquetDeleted);
        }
    }catch ( error ){
        next (error);
    }
};
  




