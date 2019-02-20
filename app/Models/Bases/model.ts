import Application from '../../../interfaces/Application';
import * as moment from 'moment';
import {DataTypeDate, DefineAttributes, DefineOptions as BaseDefineOptions, SequelizeStatic} from 'sequelize';

interface DefineOptions extends BaseDefineOptions<{}> {
    autoPrimaryKey?: boolean;
}

export default (
    app: Application,
    modelName: string,
    attributes: DefineAttributes,
    options: DefineOptions = {},
) => {
    // @ts-ignore
    const model = app.sequelize.define(modelName, ...parse(app, attributes, options));

    if (options.autoPrimaryKey === false) {
        model.removeAttribute('id');
    }

    return model;
};

function timestampAttributeGetter(attribute: any): string | null {
    // @ts-ignore
    const value = this.getDataValue(attribute);
    return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
}

function getTimestampAttributeDefinition(DATE: DataTypeDate): object {
    return {
        type: DATE,
        get: timestampAttributeGetter,
    };
}

function getDefaultAttributes(options: DefineOptions = {}, sequelize: SequelizeStatic): object {
    const {DATE} = sequelize;

    const attributes: any = {};

    if ((options as any).timestamps !== false) {
        attributes.created_at = getTimestampAttributeDefinition(DATE);
        attributes.updated_at = getTimestampAttributeDefinition(DATE);
    }

    if (options.deletedAt) {
        attributes[
            typeof options.deletedAt === 'string'
                ? options.deletedAt
                : 'deleted_at'
            ] = getTimestampAttributeDefinition(DATE);
    }

    return attributes;
}

function parseAttributes(attributes: DefineAttributes, sequelize: SequelizeStatic): DefineAttributes {
    for (const attribute in attributes) {
        if (
            attributes.hasOwnProperty(attribute)
            && (
                attributes[attribute] instanceof sequelize.DATE
                || attributes[attribute] === sequelize.DATE
            )
        ) {
            // @ts-ignore
            attributes[attribute] = {
                type: sequelize.DATE,
                get: timestampAttributeGetter,
            };
        }
    }

    return attributes;
}

function parseOptions(options: DefineOptions = {}, sequelize: SequelizeStatic) {
    const {Op} = sequelize;

    return {
        timestamps: true,
        underscored: true,
        ...options,
        // scopes: {
        //     onlyTrashed: {
        //         where: {
        //             deleted_at: {
        //                 [Op.not]: null,
        //             },
        //         },
        //     },
        // },
    };
}

function parse({Sequelize}: Application, attributes: DefineAttributes, options: DefineOptions = {}): Array<object> {
    return [
        {
            ...parseAttributes(attributes, Sequelize),
            ...getDefaultAttributes(options, Sequelize),
        },
        parseOptions(options, Sequelize),
    ];
}
