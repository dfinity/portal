use search::PageSearchResult;

pub fn print_results(results: &[PageSearchResult]) {
    if results.len() == 0 {
        println!("No results found");
        return;
    }

    for (index, page_result) in results.iter().enumerate() {
        // highlight search terms in body using result.
        // let mut body = result.doc.body.clone();
        // let mut offset = 0;
        // for (start, end) in result.term_positions.iter() {
        //     let highlighted = body[*start + offset..*end + offset].green().to_string();

        //     body.replace_range(*start + offset..*end + offset, &highlighted);

        //     offset += highlighted.len() - (end - start);
        // }

        // body = if let Some(first) = result.term_positions.first() {
        //     let start = if first.0 < 20 { 0 } else { first.0 - 20 };
        //     let end = if body.len() - start < 100 {
        //         body.len()
        //     } else {
        //         start + 100
        //     };

        //     body[start..end].to_string()
        // } else {
        //     body
        // };
        println!("{}. {}", index, page_result.title);
        for result in page_result.results.iter() {
            println!(
                "  {} [count={}, score={:.2}]\n  {}\n  {}\n",
                result.doc.title,
                result.term_positions.len(),
                result.score,
                result.doc.url,
                result.doc.excerpt
            );
        }

        // println!(
        //     "{}. {} / {} [count={}, score={:.2}]\n  {}\n  {}\n",
        //     index + 1,
        //     result.doc.page_title,
        //     result.doc.title,
        //     result.term_positions.len(),
        //     result.score,
        //     result.doc.url,
        //     result.doc.excerpt
        // );
    }
}
