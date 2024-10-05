const csvData = promotions.map(promotion => 
    `${promotion.title},${promotion.description},${promotion.start_date},${promotion.end_date},${promotion.discount_percentage}`
  ).join("\n");
  
  const csvHeader = "Title,Description,Start Date,End Date,Discount Percentage\n";
  const csv = csvHeader + csvData;
  