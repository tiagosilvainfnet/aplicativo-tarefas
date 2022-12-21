import * as React from 'react';
import { List, Checkbox, IconButton  } from 'react-native-paper';

const ListCustom = ({ items, edit, _delete }) => {
    return <>
                {
                    items.map((item, idx) => {
                        return <List.Item
                                    key={idx}
                                    title="Título"
                                    description="10/02/2023 10:10"
                                    onPress={() => edit(item.id)}
                                    left={props => <Checkbox.Item status="checked" />}
                                    right={props => <IconButton
                                                        icon="delete"
                                                        size={20}
                                                        onPress={() => _delete(item.id)}
                                                    />}
                                />
                    })
                }
           </>
}

export default ListCustom;