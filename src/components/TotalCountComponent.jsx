import {Typography, Box, Chip} from "@mui/material";
import {HiMiniArrowTrendingUp, HiMiniArrowTrendingDown} from "react-icons/hi2";
import {Remove} from "@mui/icons-material";

function TotalCountComponent({
                                 icon,
                                 img,
                                 title,
                                 quantity,
                                 percentage,
                                 gradient1,
                                 gradient2,
                                 textColor,
                                 dateData = [],
                                 values = [],
                             }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formattedDateData = dateData.map((date) => formatDate(date));

    // Determine trend icon and color based on percentage
    const getTrendIcon = (percentage) => {
        if (!percentage) return null;
        if (percentage.includes('+')) {
            return <HiMiniArrowTrendingUp className="w-4 h-4 text-green-500" />;
        } else if (percentage.includes('-')) {
            return <HiMiniArrowTrendingDown className="w-4 h-4 text-red-500" />;
        }
        return <Remove className="w-4 h-4 text-gray-500" />;
    };

    const getPercentageColor = (percentage) => {
        if (!percentage) return 'text-gray-500';
        if (percentage.includes('+')) return 'text-green-600';
        if (percentage.includes('-')) return 'text-red-600';
        return 'text-gray-600';
    };

    return (
        <div
            className={`h-52 rounded-xl flex justify-between p-4 relative overflow-hidden`}
            style={{
                background: `linear-gradient(135deg, ${gradient1}, ${gradient2})`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
            }}
        >
            {/* Background pattern overlay */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                }}
            />
            
            <div className="flex flex-col justify-between relative z-10">
                {/* Icon Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {img && (
                        <img
                            src={img}
                            alt={title}
                            className="h-12 w-12 object-cover rounded-lg"
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                        />
                    )}
                    {icon && (
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}>
                            {icon}
                        </Box>
                    )}
                </Box>

                {/* Content Section */}
                <div className="ml-2 mb-2">
                    <Typography 
                        variant="body2" 
                        sx={{
                            color: textColor,
                            fontWeight: 500,
                            opacity: 0.9,
                            mb: 0.5,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontSize: '0.75rem'
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold", 
                            color: textColor,
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            lineHeight: 1.2
                        }}
                    >
                        {quantity || 0}
                    </Typography>
                </div>
            </div>

            {/* Right Side - Percentage and Trend */}
            <div className="flex flex-col justify-between items-end relative z-10">
                {/* Percentage Indicator */}
                {percentage && (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 1
                    }}>
                        {getTrendIcon(percentage)}
                        <Chip
                            label={percentage}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: textColor,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '24px',
                                '& .MuiChip-label': {
                                    px: 1
                                }
                            }}
                        />
                    </Box>
                )}
                
                {/* Empty space for balance */}
                <div className="flex-1" />
            </div>
        </div>
    );
}

export default TotalCountComponent;
