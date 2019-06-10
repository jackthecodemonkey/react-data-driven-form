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
}

export default Group;