import Field from './Field';

class Group {
    constructor(localGroup = {}, parentId = null) {
        this.groupId = localGroup.groupId || null;
        this.className = localGroup.className || null;
        this.style = localGroup.style || {};
        this.parentId = parentId;
        this.subGroup = Array.isArray(localGroup.subGroup)
            ? localGroup.subGroup.map(sub => {
                return sub.groupId
                    ? new Group(sub, this.groupId)
                    : new Field(sub)
            })
            : [];
    }

    FindField(field) {
        let found = false;
        this.subGroup.forEach((local)=>{
            const hasField = local.FindField(field);
            if(hasField) found = true;
        })
        return found;
    }
}

export default Group;