import React from 'react';
import Source from './Source';

export default function Sources(props) {
    return <section id="sources">{props.sources.map((source, index) => {
        return <Source key={index} index={index} {...source} />
    })}</section>
}
