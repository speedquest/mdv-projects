//
//  CustomCellView.h
//  MDF2_Calendar_Week1
//
//  Created by Nicholas Weil on 10/24/12.
//  Copyright (c) 2012 Nicholas Weil. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CustomCellView : UITableViewCell
{
    IBOutlet UILabel *placeLabel;
    IBOutlet UILabel *detailLabel;
}

@property (strong, nonatomic)IBOutlet UILabel *placeLabel;
@property (strong, nonatomic)IBOutlet UILabel *detailLabel;

@end
